package admin

import (
	"errors"
	"time"

	adminRepo "backend/resource/repositories/admin"

	"gorm.io/gorm"
)

type SubscriptionService struct {
	Repo *adminRepo.SubscriptionRepository
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

type SubscriptionResponse struct {
	Subscription SubscriptionSummary `json:"subscription"`
	Billing      *BillingSummary     `json:"billing"`
	Payments     []PaymentSummary    `json:"payments"`
}

var ErrSubscriptionNotFound = errors.New(
	"subscription not found",
)

func (s *SubscriptionService) GetSubscription(agencyID uint) (*SubscriptionResponse, error) {

	subscription, err := s.Repo.GetCurrentSubscription(agencyID)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrSubscriptionNotFound
		}

		return nil, err
	}

	payments, err := s.Repo.GetPayments(
		agencyID,
		subscription.ID,
	)

	if err != nil {
		return nil, err
	}

	daysRemaining := 0

	now := time.Now()

	if subscription.EndDate.After(now) {
		daysRemaining = int(
			subscription.EndDate.Sub(now).Hours() / 24,
		)

		if daysRemaining < 0 {
			daysRemaining = 0
		}
	}

	var billing *BillingSummary

	if len(payments) > 0 {
		payment := payments[0]

		billing = &BillingSummary{
			Amount:      payment.Amount,
			Status:      payment.Status,
			PaymentDate: payment.PaymentDate,
		}
	}

	result := &SubscriptionResponse{
		Subscription: SubscriptionSummary{
			ID:            subscription.ID,
			Plan:          string(subscription.Plan),
			Price:         subscription.Price,
			Status:        string(subscription.Status),
			StartDate:     subscription.StartDate,
			EndDate:       subscription.EndDate,
			DaysRemaining: daysRemaining,
		},
		Billing:  billing,
		Payments: make([]PaymentSummary, 0, len(payments)),
	}

	for _, payment := range payments {
		result.Payments = append(
			result.Payments,
			PaymentSummary{
				ID:          payment.ID,
				Amount:      payment.Amount,
				Status:      payment.Status,
				PaymentDate: payment.PaymentDate,
				CreatedAt:   payment.CreatedAt,
			},
		)
	}

	return result, nil
}
