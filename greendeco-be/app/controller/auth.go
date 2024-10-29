package controller

import (
	"time"

	"greendeco-be/app/models"
	"greendeco-be/pkg/configs"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// generatePasswordHash() use to generate hashed password
func generatePasswordHash(password []byte) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

// IsValidPassword() use to compare hash password
func isValidPassword(hash, password string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return false
	}
	return true
}

// generateToken() use to create new token
func generateToken(user *models.User, during time.Duration) (string, error) {
	config := configs.AppConfig().Auth
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"admin":   user.IsAdmin,
		"exp":     time.Now().Add(during).Unix(),
	})

	return token.SignedString([]byte(config.JWTSecret))
}
