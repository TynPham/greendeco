package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app fiber.Router) {
	auth := app.Group("/auth")
	publicAuthRouter(auth)
	privateAuthRouter(auth)
}

func publicAuthRouter(app fiber.Router) {
	app.Post("/register", controller.CreateUser)
	app.Post("/login", controller.Login)
	app.Post("/forgot-password", controller.ForgotPassword)
}

func privateAuthRouter(app fiber.Router) {
	app.Use(middlewares.JWTProtected())
	app.Put("/password", controller.UpdatePassword)
}
