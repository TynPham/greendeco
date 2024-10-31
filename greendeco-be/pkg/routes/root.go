package routes

import (
	_ "greendeco-be/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func SwaggerRoute(a fiber.Router) {
    a.Get("/docs/*", swagger.New(swagger.Config{
        URL: "/docs/doc.json",
        DeepLinking: true,
        Title: "GreenDeco API Documentation",
    }))

    a.Get("/api/v1/", func(c *fiber.Ctx) error {
        return c.Redirect("/docs")
    })
}