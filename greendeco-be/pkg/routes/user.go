package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	user := app.Group("/user")

	privateUserRouter(user)
	publicUserRouter(user)
}

func publicUserRouter(app fiber.Router) {
}

func privateUserRouter(app fiber.Router) {
	app.Use(middlewares.JWTProtected())
	app.Get("/me", controller.GetUserInfo)
	app.Put("/update", controller.UpdateUserInformation)
	app.Get("/:id", middlewares.AdminProtected, controller.GetUserById)
}
