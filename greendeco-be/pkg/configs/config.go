package configs

import (
	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"log"
)

func init() {
    // Load .env file
    if err := godotenv.Load(); err != nil {
        log.Printf("Warning: .env file not found: %v", err)
    }
}

type Config struct {
	App struct {
		Host string `envconfig:"APP_HOST"`
		PORT string `envconfig:"APP_PORT"`
	}
	Database struct {
		Host     string `envconfig:"DB_HOST"`
		Name     string `envconfig:"DB_NAME"`
		Port     string `envconfig:"DB_PORT"`
		User     string `envconfig:"DB_USER"`
		Password string `envconfig:"DB_PASSWORD"`
		SSLMode  string `envconfig:"DB_SSLMODE"`
	}
	Auth struct {
		JWTSecret        string `envconfig:"JWT_SECRET" default:"token-secret"`
		TokenExpire      int    `envconfig:"TOKEN_EXPIRE" default:"60"`
		ShortTokenExpire int    `envconfig:"SHORT_TOKEN_EXPIRE" default:"15"`
	}
	SMTP struct {
		Email             string `envconfig:"SMTP_EMAIL"`
		Password          string `envconfig:"SMTP_PASSWORD"`
		LinkResetPassword string `envconfig:"SMTP_LINK_RESET_PSW"`
	}
	Supabase struct {
		URL    string `envconfig:"SUPABASE_URL" required:"true"`
		Key    string `envconfig:"SUPABASE_KEY" required:"true"`
		Bucket string `envconfig:"SUPABASE_BUCKET" required:"true"`
	}
	VnPay struct {
		Secret     string `envconfig:"VNPAY_SECRET"`
		TmnCode    string `envcofig:"VNPAY_TMNCODE"`
		ReturnUrl  string `envconfig:"VNPAY_RETURN_URL"`
		CancelUrl  string `envconfig:"VNPAY_CANCEL_URL"`
		SuccessUrl string `envconfig:"VNPAY_SUCCESS_URL"`
		ErrorUrl   string `envconfig:"VNPAY_ERROR_URL"`
	}
	PayPal struct {
		ClientId   string `envconfig:"PAYPAL_CLIENT"`
		SecretKey  string `envconfig:"PAYPAL_SECRET_KEY"`
		ReturnUrl  string `envconfig:"PAYPAL_RETURN_URL"`
		SuccessUrl string `envconfig:"PAYPAL_SUCCESS_URL"`
	}
	ExchangeMoneyApi struct {
		Url string `envconfig:"EXCHANGE_MONEY_API"`
	}
}

var appConfig = &Config{}

func AppConfig() *Config {
	return appConfig
}

func LoadConfig() error {
	if err := envconfig.Process("", appConfig); err != nil {
		return err
	}

	return nil
}