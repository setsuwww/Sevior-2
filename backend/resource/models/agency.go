package models

import "time"

type Agency struct {
	ID           uint   `gorm:"primaryKey"`
	AgencyName   string `gorm:"type:varchar"`
	OwnerName    string `gorm:"type:varchar"`
	Contact      string `gorm:"type:varchar"`
	Email        string `gorm:"type:varchar"`
	Description  string `gorm:"type:text"`
	Website      string `gorm:"type:varchar"`
	Location     string `gorm:"type:varchar"`
	ProfileImage string `gorm:"type:text"`
	Status             string `gorm:"type:varchar"`
	SubscriptionPlan   string `gorm:"type:varchar"`
	SubscriptionStatus string `gorm:"type:varchar"`
	CreatedAt          time.Time
	UpdatedAt    time.Time

	// Relations
	SocialMedias    []SocialMedia    `gorm:"foreignKey:AgencyID"`
	Users           []User           `gorm:"foreignKey:AgencyID"`
	ProjectRequests []ProjectRequest `gorm:"foreignKey:AgencyID"`
	Projects        []Project        `gorm:"foreignKey:AgencyID"`
	Tasks           []Task           `gorm:"foreignKey:AgencyID"`
	Comments        []Comment        `gorm:"foreignKey:AgencyID"`
	Files           []File           `gorm:"foreignKey:AgencyID"`
	Invoices        []Invoice        `gorm:"foreignKey:AgencyID"`
	Notifications   []Notification   `gorm:"foreignKey:AgencyID"`
	ActivityLogs    []ActivityLog    `gorm:"foreignKey:AgencyID"`
}
