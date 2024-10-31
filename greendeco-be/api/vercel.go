package api

import (
	"log"
	"net/http"

	"greendeco-be/pkg/configs"
	"greendeco-be/pkg/routes"
	"greendeco-be/pkg/validators"
	"greendeco-be/platform/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	r.RequestURI = r.URL.String()

	handler().ServeHTTP(w, r)
}

func handler() http.HandlerFunc {
	err := configs.LoadConfig()
	if err != nil {
		log.Fatal("error")
	}

	if err := database.ConnectDB(); err != nil {
		log.Panic(err)
	}

	validators.AddProductQueryDecoder()
	validators.AddOrderQueryDecoder()
	app := fiber.New()

	app.Use(logger.New())
	corsApp := cors.ConfigDefault
	corsApp.AllowCredentials = true
	corsApp.AllowHeaders = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	app.Use(cors.New(corsApp))
	app.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	routes.SwaggerRoute(app)
	api := app.Group("/api/v1")
	routes.AuthRoutes(api)
	routes.UserRoutes(api)
	routes.NewMediaRouter(api).RegisterRoutes()
	routes.NewProductRouter(api).RegisterRoutes()
	routes.NewAdminRouter(api).RegisterRoutes()
	routes.CategoryRouter(api)

	routes.NewReviewRoutes(api).RegisterRoutes()
	routes.NewProductRouter(api).RegisterRoutes()
	routes.NewVariantRouter(api).RegisterRoute()
	routes.NewCartRouter(api).RegisterRoutes()
	routes.NewColorRouter(api).RegisterRoutes()
	routes.NewCouponRouter(api).RegisterRoutes()
	routes.NewOrderRouter(api).RegisterRoutes()
	routes.NewNotificationRouter(api).RegisterRoutes()
	routes.NewPaymentRouter(api).RegisterRoutes()

	return adaptor.FiberApp(app)
}
