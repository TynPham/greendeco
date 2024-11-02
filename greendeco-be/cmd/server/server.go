package server

import (
	"log"

	"greendeco-be/pkg/configs"
	"greendeco-be/pkg/routes"
	"greendeco-be/pkg/validators"
	"greendeco-be/platform/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// @title GreenDeco API
// @version 1.0
// @description GreenDeco E-commerce backend API
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email duteam@domain.com
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8080
// @BasePath /api/v1
// @schemes http https
// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
func Serve() {
	err := configs.LoadConfig()
	if err != nil {
		log.Fatal("error loading config")
	}

	// Connect to database
	if err := database.ConnectDB(); err != nil {
		log.Panic(err)
	}
	// Ensure DB connection is closed when server shuts down
	defer database.CloseDB()

	validators.AddProductQueryDecoder()
	validators.AddOrderQueryDecoder()

	app := fiber.New()
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.Get("/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hellooo")
	})
	routes.SwaggerRoute(app)
	api := app.Group("/api/v1")
	routes.UserRoutes(api)
	routes.AuthRoutes(api)
	routes.NewMediaRouter(api).RegisterRoutes()
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
	if err := app.Listen(":8080"); err != nil {
		log.Fatal("not response")
	}
}
