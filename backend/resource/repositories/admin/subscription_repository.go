package admin

import (
	adminModel "backend/resource/models"

	"gorm.io/gorm"
)

type SubscriptionRepository struct {
	DB *gorm.DB
}

func (r *SubscriptionRepository) GetCurrentSubscription(
	agencyID uint,
) (*adminModel.Subscription, error) {

	var subscription adminModel.Subscription

	err := r.DB.
		Where("agency_id = ?", agencyID).
		Where(
			"status IN ?",
			[]adminModel.SubscriptionStatus{
				adminModel.SubscriptionStatusActive,
				adminModel.SubscriptionStatusTrialing,
			},
		).
		Order("end_date DESC").
		First(&subscription).
		Error

	if err != nil {
		return nil, err
	}

	return &subscription, nil
}

func (r *SubscriptionRepository) GetPayments(agencyID uint, subscriptionID uint) ([]adminModel.Payment, error) {

	var payments []adminModel.Payment

	err := r.DB.
		Where(
			"agency_id = ? AND subscription_id = ?",
			agencyID,
			subscriptionID,
		).
		Order("created_at DESC").
		Find(&payments).
		Error

	return payments, err
}
