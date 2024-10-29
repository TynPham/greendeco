package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

type VariantRoutes struct {
	app fiber.Router
}

func NewVariantRouter(app fiber.Router) *VariantRoutes {
	return &VariantRoutes{app: app.Group("/variant")}
}

func (r *VariantRoutes) RegisterRoute() {
	r.publicProductRouter()
	r.privateProductRouter()
}

func (r *VariantRoutes) publicProductRouter() {
	r.app.Get("/product/:id", controller.GetVariantsByProductId)
	r.app.Get("/:id", controller.GetVariantById)
	r.app.Get("/default/:id", controller.GetDefaultVariant)
}

func (r *VariantRoutes) privateProductRouter() {
	r.app.Use(middlewares.JWTProtected())
	r.app.Use(middlewares.AdminProtected)
	r.app.Post("/", controller.CreateVariant)
	r.app.Delete("/:id", controller.DeleteVariant)
	r.app.Put("/:id", controller.UpdateVariant)
	
}
