package controller

import (
	"crypto/hmac"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math"
	"net/url"
	"sort"
	"time"

	"greendeco-be/app/models"
	"greendeco-be/app/repository"
	"greendeco-be/pkg/configs"
	"greendeco-be/platform/database"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/plutov/paypal"

	"github.com/golang-jwt/jwt/v5"
)

// @CreateVnPayPayment() godoc
// @Summary create new order from cart
// @Tags Payment
// @Param todo body models.PaymentRequest true "order request"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /payment/vnpay_create [post]
// @Security Bearer
func CreateVnPayPayment(c *fiber.Ctx) error {
	newReq := &models.PaymentRequest{}
	if err := c.BodyParser(newReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	token, ok := c.Locals("user").(*jwt.Token)

	if !ok {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(models.ErrorResponse{
			Message: "can not parse token",
		})
	}

	orderRepo := repository.NewOrderRepo(database.GetDB())
	order, err := orderRepo.GetOrderById(newReq.Id)
	if err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	// serverIP := "64.29.17.193"
	url, err := createVNPayBill(order, c.IP(), token.Raw)
	if err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	return c.JSON(fiber.Map{
		"callback_url": url,
	})
}

// @VnPay_Return() godoc
// @Summary vnPay return
// @Tags Payment
// @Param todo body models.PaymentRequest true "order request"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /payment/vnpay_return [Get]
func VnPay_Return(c *fiber.Ctx) error {
	vpnParams := c.Queries()
	secureHash := vpnParams["vnp_SecureHash"]
	accessToken := vpnParams["accessToken"] 

	delete(vpnParams, "vnp_SecureHash")
	delete(vpnParams, "vnp_SecureHashType")
	if secureHash != "" {
		orderId := vpnParams["vnp_TxnRef"]
		if vpnParams["vnp_ResponseCode"] == "24" { // status cancel
			return c.Redirect(configs.AppConfig().VnPay.CancelUrl + orderId)
		}

		oId, err := uuid.Parse(orderId)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "invalid id",
			})
		}

		if vpnParams["vnp_ResponseCode"] != "00" { // 00 is status success
			return c.Redirect(configs.AppConfig().VnPay.ErrorUrl + orderId + "?status=error&accessToken=" + accessToken)
		}

		orderRepo := repository.NewOrderRepo(database.GetDB())
		order, err := orderRepo.GetOrderById(oId)
		if err != nil {
			if err == models.ErrNotFound {
				return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
					Message: "record not found",
				})
			}
		}

		paidAt := time.Now().Format(time.RFC3339)
		if err := orderRepo.UpdateOrder(&models.UpdateOrder{
			OrderId:     order.ID,
			State:       models.StatusProcessing,
			PaidAt:      &paidAt,
			Description: order.Description,
		}); err != nil {
			return c.Redirect(configs.AppConfig().VnPay.ErrorUrl)
		}
		return c.Redirect(configs.AppConfig().VnPay.SuccessUrl + orderId + "?status=success&accessToken=" + accessToken)
	} else {
		return c.Redirect(configs.AppConfig().VnPay.ErrorUrl)
	}
}

// @CreatePayPalPayment() godoc
// @Summary create payment with paypal
// @Tags Payment
// @Param todo body models.PaymentRequest true "request"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /payment/paypal_create [post]
// @Security Bearer
func CreatePayPalPayment(c *fiber.Ctx) error {
	newReq := &models.PaymentRequest{}
	if err := c.BodyParser(newReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	// find order
	orderRepo := repository.NewOrderRepo(database.GetDB())
	order, err := orderRepo.GetOrderById(newReq.Id)
	if err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	// get total
	total, err := orderRepo.GetTotalPaymentForOrder(order.ID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	actualPrice := float64(total)
	if order.CouponDiscount != 0 {
		actualPrice *= float64(order.CouponDiscount) / 100
	}

	totalString := fmt.Sprintf("%.0f", actualPrice)
	//
	cfg := configs.AppConfig().PayPal
	client, err := paypal.NewClient(cfg.ClientId, cfg.SecretKey, paypal.APIBaseSandBox)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	_, err = client.GetAccessToken()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	nOrder, err := client.CreateOrder("CAPTURE", []paypal.PurchaseUnitRequest{
		{
			Amount: &paypal.PurchaseUnitAmount{
				Currency: "USD",
				Value:    totalString,
			},
			ReferenceID: order.ID.String(),
			Description: "thanks",
		},
	}, &paypal.CreateOrderPayer{}, &paypal.ApplicationContext{
		BrandName: "greendeco",
		ReturnURL: cfg.ReturnUrl,
	})
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(fiber.Map{"order_id": nOrder.ID})
}

// @PayPalReturn() godoc
// @Summary paypal return
// @Tags Payment
// @Param todo body models.PayPalReturn true "request"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /payment/paypal_return [Post]
func PayPalReturn(c *fiber.Ctx) error {
	newReq := &models.PayPalReturn{}
	if err := c.BodyParser(newReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	cfg := configs.AppConfig().PayPal
	client, err := paypal.NewClient(cfg.ClientId, cfg.SecretKey, paypal.APIBaseSandBox)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	_, err = client.GetAccessToken()
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Message: "record not found",
			Errors:  err.Error(),
		})
	}

	_, err = client.CaptureOrder(newReq.ID, paypal.CaptureOrderRequest{})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Message: "record not found",
			Errors:  err.Error(),
		})
	}

	paypalOrder, err := client.GetOrder(string(newReq.ID))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	// update order
	orderRepo := repository.NewOrderRepo(database.GetDB())
	orderIdString, err := uuid.Parse(paypalOrder.PurchaseUnits[0].ReferenceID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	order, err := orderRepo.GetOrderById(orderIdString)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	paidAt := time.Now().Format(time.RFC3339)
	if err := orderRepo.UpdateOrder(&models.UpdateOrder{
		OrderId:     order.ID,
		State:       models.StatusProcessing,
		PaidAt:      &paidAt,
		Description: order.Description,
	}); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend",
		})
	}

	return c.JSON(fiber.Map{
		"url": cfg.SuccessUrl,
	})
}

func exchangeCurrencyFromUSDToVN(amount float64) (float64, error) {
	agent := fiber.AcquireAgent()
	agent.Request().Header.SetMethod(fiber.MethodGet)
	agent.Request().SetRequestURI("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
	
	err := agent.Parse()
	if err != nil {
		return 0, err
	}

	statusCode, body, errs := agent.Bytes()

	if statusCode == fiber.StatusInternalServerError {
		return 0, errors.New("fail to get currency")
	}

	if len(errs) > 0 {
		return 0, errs[0]
	}

	var response models.PaymentCurrenctResponse
	err = json.Unmarshal(body, &response)

	if err != nil {
		return 0, err
	}

	vndRate, exists := response.USD["vnd"]
	if !exists {
		return 0, errors.New("VND exchange rate not found")
	}

	vndAmount := amount * vndRate

	return math.Round(vndAmount), nil
}

func createVNPayBill(order *models.Order, IP string, accessToken string) (string, error) {
	orderRepo := repository.NewOrderRepo(database.GetDB())
	total, err := orderRepo.GetTotalPaymentForOrder(order.ID)
	if err != nil {
		return "", err
	}

	actualPrice := float64(total)

	if order.CouponDiscount != 0 {
		actualPrice *= float64(order.CouponDiscount) / 100
	}


	totalVNDFloat, err := exchangeCurrencyFromUSDToVN(actualPrice)
	if err != nil {
		return "", err
	}
	// ipAddr := IP
    // if configs.AppConfig().Environment.Env == "development" {
    //     ipAddr = "127.0.0.1"
    // }
	totalString := fmt.Sprintf("%.0f", totalVNDFloat*100)
	cfgs := configs.AppConfig().VnPay
	t := time.Now().Format("20060102150405")
	v := url.Values{}
	v.Set("vnp_Version", "2.1.0")
	v.Set("vnp_Command", "pay")
	v.Set("vnp_TmnCode", cfgs.TmnCode)
	v.Set("vnp_Locale", "vn")
	v.Set("vnp_CurrCode", "VND")
	v.Set("vnp_TxnRef", order.ID.String()) // change bac
	v.Set("vnp_OrderInfo", "customer paid orderId")
	v.Set("vnp_OrderType", "other")
	v.Set("vnp_Amount", totalString)
	v.Set("vnp_ReturnUrl", cfgs.ReturnUrl + "api/v1/payment/vnpay_return?accessToken=" + accessToken)
	v.Set("vnp_IpAddr", IP)
	v.Set("vnp_CreateDate", t)

	sortedParam := sortURLValues(v)
	hash := hmac.New(sha512.New, []byte(cfgs.Secret))
	hash.Write([]byte(sortedParam.Encode()))

	sign := hex.EncodeToString(hash.Sum(nil))
	v.Set("vnp_SecureHash", sign)

	return models.VnPayUrl + "?" + v.Encode(), nil
}

func sortURLValues(values url.Values) url.Values {
	keys := make([]string, 0, len(values))
	for key := range values {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	sortedValues := make(url.Values)
	for _, key := range keys {
		sortedValues[key] = values[key]
	}
	return sortedValues
}
