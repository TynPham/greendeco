package controller

import (
	"greendeco-be/app/models"
	"greendeco-be/app/repository"
	"greendeco-be/pkg/validators"
	"greendeco-be/platform/database"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// @CreateCoupon() godoc
// @Summary create new coupon require admin permission date must be formated yyyy-mm-dd
// @Tags Coupon
// @Param todo body models.CreateCoupon true "New product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /coupon/ [post]
// @Security Bearer
func CreateCoupon(c *fiber.Ctx) error {
	newCoupon := &models.CreateCoupon{}
	if err := c.BodyParser(newCoupon); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	validate := validators.NewValidator()
	if err := validate.Struct(newCoupon); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(models.ErrorResponse{
			Message: "invalid input found",
			Errors:  validators.ValidatorErrors(err),
		})
	}

	for _, v := range [...]string{
		newCoupon.StartDate,
		newCoupon.EndDate,
	} {
		if err := validators.ValidateDate(v); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "invalid input found",
				Errors:  "can not format date",
			})
		}
	}

	couponRepo := repository.NewCouponRepo(database.GetDB())
	couponId, err := couponRepo.Create(newCoupon)
	if err != nil {
		if database.DetectDuplicateError(err) {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "record already exists",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "some thing bad happended",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": couponId,
	})
}

// @UpdateCouponById() godoc
// @Summary update counpon
// @Tags Coupon
// @Param id path string true "id"
// @Param todo body models.UpdateCoupon true "Update product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /coupon/{id} [Put]
// @Security Bearer
func UpdateCouponById(c *fiber.Ctx) error {
	cId, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	updateCoupon := &models.UpdateCoupon{
		ID: cId,
	}

	if err := c.BodyParser(updateCoupon); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	validator := validators.NewValidator()
	if err := validator.Struct(updateCoupon); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(models.ErrorResponse{
			Message: "invalid input found",
			Errors:  validators.ValidatorErrors(err),
		})
	}

	repo := repository.NewCouponRepo(database.GetDB())
	if err := repo.Update(updateCoupon); err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "record already exists",
			})
		}
	}

	return c.SendStatus(fiber.StatusCreated)
}

// @GetCouponById() godoc
// @Summary get coupon by id
// @Tags Coupon
// @Param id path string true "id of coupon"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,404,500 {object} models.ErrorResponse "Error"
// @Router /coupon/{id} [Get]
func GetCouponById(c *fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	repo := repository.NewCouponRepo(database.GetDB())
	coupon, err := repo.GetCouponById(id)
	if err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	return c.Status(fiber.StatusOK).JSON(models.BasePaginationResponse{
		Items:    coupon,
		Page:     1,
		PageSize: 1,
		Next:     false,
		Prev:     false,
	})
}

// @GetCouponById() godoc
// @Summary get coupon by code
// @Tags Coupon
// @Param code path string true "code of coupon"
// @Accept json
// @Produce json
// @Success 200 {object} models.BasePaginationResponse
// @Failure 400,404,500 {object} models.ErrorResponse "Error"
// @Router /coupon/code/{code} [Get]
func GetCouponByCode(c *fiber.Ctx) error {
	code := c.Params("code")
	if code == "" {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	repo := repository.NewCouponRepo(database.GetDB())
	coupon, err := repo.GetCouponByCode(code)
	if err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend",
		})
	}

	return c.Status(fiber.StatusOK).JSON(models.BasePaginationResponse{
		Items:    coupon,
		Page:     1,
		PageSize: 1,
		Next:     false,
		Prev:     false,
	})
}

// @DeleteCouponById() godoc
// @Summary delete coupon by id
// @Tags Coupon
// @Param id path string true "id of coupon"
// @Accept json
// @Produce json
// @Success 200 {object} models.BasePaginationResponse
// @Failure 400,404,500 {object} models.ErrorResponse "Error"
// @Router /coupon/{id} [delete]
// @Security Bearer
func DeleteCouponById(c *fiber.Ctx) error {
	cId, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	repo := repository.NewCouponRepo(database.GetDB())
	if err := repo.DeleteById(cId); err != nil {
		if err == models.ErrNotFound {
			return c.Status(fiber.StatusNotFound).JSON(models.ErrorResponse{
				Message: "record not found",
			})
		}
	}

	return c.SendStatus(fiber.StatusOK)
}
