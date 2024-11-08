package middlewares

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"greendeco-be/app/models"
	"greendeco-be/pkg/configs"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/golang-jwt/jwt/v5"
)

func JWTProtected() func(*fiber.Ctx) error {
	jwtwareConfig := jwtware.Config{
		SigningKey: jwtware.SigningKey{
			Key: []byte(configs.AppConfig().Auth.JWTSecret),
		},
		ContextKey:     "user",
		ErrorHandler:   jwtError,
		SuccessHandler: verifyTokenExpiration,
	}
	return jwtware.New(jwtwareConfig)
}

func verifyTokenExpiration(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	expires := int64(claims["exp"].(float64))
	if time.Now().Unix() > expires {
		return jwtError(c, errors.New("token expired"))
	}

	return c.Next()
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
		Message: err.Error(),
	})
}

// GetUserIdFromToken() return userId from token
func GetUserIdFromToken(token *jwt.Token) (*uuid.UUID, error) {
	claims := token.Claims.(jwt.MapClaims)
	userId, ok := claims["user_id"].(string)
	if !ok {
		return nil, errors.New("can't extract user info from request")
	}

	uid, err := uuid.Parse(userId)
	if err != nil {
		return nil, err
	}

	return &uid, nil
}

func GetAdminFromToken(token *jwt.Token) bool {
	claims := token.Claims.(jwt.MapClaims)
	isAdmin := false
	isAdmin, ok := claims["admin"].(bool)
	if !ok {
		return isAdmin
	}

	return isAdmin
}

func AdminProtected(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	isAdmin, ok := claims["admin"].(bool)
	if !ok {
		return jwtError(c, errors.New("you don't have permission"))
	}

	if !isAdmin {
		return jwtError(c, errors.New("you don't have permission"))
	}

	return c.Next()
}
