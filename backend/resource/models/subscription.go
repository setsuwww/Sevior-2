package models

import (
	"time"
)

type Subscription struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	AgencyID  uint      `gorm:"not null;index" json:"agency_id"`
	Agency    Agency    `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE" json:"agency"`
	Plan      string    `gorm:"type:varchar(50);not null" json:"plan"` // Free, Team, Company
	Price     float64   `gorm:"not null" json:"price"`
	Status    string    `gorm:"type:varchar(50);not null;default:'Pending'" json:"status"` // Pending, Active, Cancelled, Expired
	StartDate time.Time `gorm:"not null" json:"start_date"`
	EndDate   time.Time `gorm:"not null" json:"end_date"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
