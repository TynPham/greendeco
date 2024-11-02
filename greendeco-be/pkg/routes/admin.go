package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"

	"github.com/gofiber/fiber/v2"
)

type AdminRouters struct {
	app fiber.Router
}

func NewAdminRouter(app fiber.Router) *AdminRouters {
	return &AdminRouters{app: app.Group("/admin")}
}

func (r *AdminRouters) RegisterRoutes() {
	r.publicAdminRoute()
	r.privateAdminRoute()
}

func (r *AdminRouters) publicAdminRoute() {
	r.app.Post("/login", controller.LoginForAdmin)
	r.app.Post("/register", controller.CreateAdminAccount)
}

func (r *AdminRouters) privateAdminRoute() {
	r.app.Use(middlewares.JWTProtected())
	r.app.Use(middlewares.AdminProtected)
	r.app.Get("/customers", controller.GetAllCustomers)
}
