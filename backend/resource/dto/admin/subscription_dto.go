package admin

import "time"

type SubscriptionResponse struct {
	Subscription SubscriptionSummary `json:"subscription"`
	Billing      *BillingSummary     `json:"billing"`
	Payments     []PaymentSummary    `json:"payments"`
}

type SubscriptionSummary struct {
	ID            uint      `json:"id"`
	Plan          string    `json:"plan"`
	Price         float64   `json:"price"`
	Status        string    `json:"status"`
	StartDate     time.Time `json:"start_date"`
	EndDate       time.Time `json:"end_date"`
	DaysRemaining int       `json:"days_remaining"`
}

type BillingSummary struct {
	Amount      float64    `json:"amount"`
	Status      string     `json:"status"`
	PaymentDate *time.Time `json:"payment_date"`
}

type PaymentSummary struct {
	ID          uint       `json:"id"`
	Amount      float64    `json:"amount"`
	Status      string     `json:"status"`
	PaymentDate *time.Time `json:"payment_date"`
	CreatedAt   time.Time  `json:"created_at"`
}
