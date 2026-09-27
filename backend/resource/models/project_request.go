package models

import "time"

const (
	ProjectRequestPending   = "PENDING"
	ProjectRequestApproved  = "APPROVED"
	ProjectRequestRejected  = "REJECTED"
	ProjectRequestCancelled = "CANCELLED"
)

type ProjectRequest struct {
	ID            uint       `gorm:"primaryKey"`
	AgencyID      *uint      `gorm:"index;not null"`
	ClientID      *uint      `gorm:"index;not null"`
	Title         string     `gorm:"type:varchar(255);not null"`
	Description   string     `gorm:"type:text;not null"`
	Category      string     `gorm:"type:varchar(100)"`
	BudgetMin     *float64   `gorm:"type:decimal(15,2)"`
	BudgetMax     *float64   `gorm:"type:decimal(15,2)"`
	Deadline      *time.Time `gorm:"type:date"`
	AttachmentURL string     `gorm:"type:text"`
	Status        string     `gorm:"type:varchar(30);not null;default:'PENDING'"`
	CreatedAt     time.Time
	UpdatedAt     time.Time

	Agency Agency `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Client User   `gorm:"foreignKey:ClientID;constraint:OnDelete:CASCADE"`

	Project *Project `gorm:"foreignKey:ProjectRequestID"`
}
