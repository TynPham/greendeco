package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"

	"github.com/gofiber/fiber/v2"
)

type ProductRouters struct {
	app fiber.Router
}

func NewProductRouter(app fiber.Router) *ProductRouters {
	return &ProductRouters{app: app.Group("/product")}
}

func (r *ProductRouters) RegisterRoutes() {
	r.publicProductRouter()
	r.privateProductRouter()
}

func (r *ProductRouters) publicProductRouter() {
	r.app.Get("/", controller.GetProducts)
	r.app.Get("/all/", middlewares.JWTProtected(), middlewares.AdminProtected, controller.GetAllProducts)
	r.app.Get("/:id", controller.GetProductById)
	r.app.Get("/:id/recommend/", controller.GetRecommendProductsById)
	// require admin protected
}

func (r *ProductRouters) privateProductRouter() {
	r.app.Use(middlewares.JWTProtected())
	r.app.Use(middlewares.AdminProtected)
	// product router
	r.app.Post("/", controller.CreateProduct)
	r.app.Put("/:id", controller.UpdateProduct)
	r.app.Delete("/:id", controller.DeleteProduct)
	r.app.Put("/:id/variant/", controller.UpdateDefaultVariant)
	// recommend router
	r.app.Post("/recommend/", controller.CreateRecommendProduct)
}
