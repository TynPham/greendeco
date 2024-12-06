package models

import "github.com/google/uuid"

const VnPayUrl = " https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"

type PaymentRequest struct {
	Id   uuid.UUID `json:"id" db:"id"`
	Type string    `json:"type"`
}

type PayPalReturn struct {
	ID string `json:"id"`
}

type PaymentCurrenctResponse struct {
	Date string         `json:"date"`
	USD  map[string]float64 `json:"usd"`
}
