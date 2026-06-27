package superadmin

import (
	"backend/resource/models"
	repo "backend/resource/repositories/superadmin"
)

type PaginatedSubscriptionsResponse struct {
	Data  []models.Subscription `json:"data"`
	Total int64                 `json:"total"`
	Page  int                   `json:"page"`
	Limit int                   `json:"limit"`
}

type PaymentStatsResponse struct {
	MonthlyRevenue float64 `json:"monthly_revenue"`
	PendingRevenue float64 `json:"pending_revenue"`
	TotalPaid      float64 `json:"total_paid"`
}

type PaymentService interface {
	GetSubscriptions(page, limit int, status string) (*PaginatedSubscriptionsResponse, error)
	GetPaymentStats() (*PaymentStatsResponse, error)
	MarkAsPaid(id uint) error
	CancelSubscription(id uint) error
	ExtendSubscription(id uint, days int) error
}

type paymentService struct {
	repo repo.PaymentRepository
}

func NewPaymentService(repo repo.PaymentRepository) PaymentService {
	return &paymentService{repo}
}

func (s *paymentService) GetSubscriptions(page, limit int, status string) (*PaginatedSubscriptionsResponse, error) {
	subs, total, err := s.repo.GetSubscriptions(page, limit, status)
	if err != nil {
		return nil, err
	}

	return &PaginatedSubscriptionsResponse{
		Data:  subs,
		Total: total,
		Page:  page,
		Limit: limit,
	}, nil
}

func (s *paymentService) GetPaymentStats() (*PaymentStatsResponse, error) {
	monthly, pending, totalPaid, err := s.repo.GetPaymentStats()
	if err != nil {
		return nil, err
	}

	return &PaymentStatsResponse{
		MonthlyRevenue: monthly,
		PendingRevenue: pending,
		TotalPaid:      totalPaid,
	}, nil
}

func (s *paymentService) MarkAsPaid(id uint) error {
	return s.repo.MarkAsPaid(id)
}

func (s *paymentService) CancelSubscription(id uint) error {
	return s.repo.CancelSubscription(id)
}

func (s *paymentService) ExtendSubscription(id uint, days int) error {
	return s.repo.ExtendSubscription(id, days)
}
