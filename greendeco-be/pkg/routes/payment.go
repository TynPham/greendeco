package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"

	"github.com/gofiber/fiber/v2"
)

type paymentRoutes struct {
	app fiber.Router
}

func NewPaymentRouter(app fiber.Router) *paymentRoutes {
	return &paymentRoutes{
		app: app.Group("/payment"),
	}
}

func (r *paymentRoutes) RegisterRoutes() {
	r.publicOrderRoutes()
	r.privateOrderRoutes()
}

func (r *paymentRoutes) publicOrderRoutes() {
	r.app.Get("/vnpay_return", controller.VnPay_Return)
	r.app.Post("/paypal_return", controller.PayPalReturn)
}

func (r *paymentRoutes) privateOrderRoutes() {
	r.app.Use(middlewares.JWTProtected())
	r.app.Post("/vnpay_create", controller.CreateVnPayPayment)
	r.app.Post("/paypal_create", controller.CreatePayPalPayment)
}
