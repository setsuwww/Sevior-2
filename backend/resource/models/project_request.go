package models

import "time"

type ProjectRequest struct {
	ID            uint       `gorm:"primaryKey"`
	AgencyID      *uint      `gorm:"index"`
	ClientID      *uint      `gorm:"index"`
	Title         string     `gorm:"type:varchar"`
	Description   string     `gorm:"type:text"`
	Category      string     `gorm:"type:varchar"`
	BudgetMin     *float64   `gorm:"type:decimal"`
	BudgetMax     *float64   `gorm:"type:decimal"`
	Deadline      *time.Time `gorm:"type:date"`
	AttachmentURL string     `gorm:"type:text"`
	Status        string     `gorm:"type:varchar"`
	CreatedAt     time.Time
	UpdatedAt     time.Time

	Agency   Agency    `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Client   User      `gorm:"foreignKey:ClientID;constraint:OnDelete:CASCADE"`
	Projects []Project `gorm:"foreignKey:ProjectRequestID"`
}
