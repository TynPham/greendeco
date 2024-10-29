package routes

import (
	"greendeco-be/app/controller"
	"greendeco-be/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

type MediaRoutes struct {
	app fiber.Router
}

func NewMediaRouter(app fiber.Router) *MediaRoutes {
	return &MediaRoutes{app: app.Group("/media")}
}

func (r *MediaRoutes) RegisterRoutes() {
	r.privateRouter()
}

func (r *MediaRoutes) privateRouter() {
	r.app.Use(middlewares.JWTProtected())
	r.app.Post("/upload", controller.PostMedia)
}
