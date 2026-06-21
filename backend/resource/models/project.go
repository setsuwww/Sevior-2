package models

import "time"

type Project struct {
	ID               uint       `gorm:"primaryKey"`
	AgencyID         *uint      `gorm:"index"`
	ProjectRequestID *uint      `gorm:"index"`
	ClientID         *uint      `gorm:"index"`
	Title            string     `gorm:"type:varchar"`
	Description      string     `gorm:"type:text"`
	Budget           *float64   `gorm:"type:decimal"`
	Progress         *int       `gorm:"type:int"`
	CurrentPhase     string     `gorm:"type:varchar"`
	StartDate        *time.Time `gorm:"type:date"`
	EndDate          *time.Time `gorm:"type:date"`
	Status           string     `gorm:"type:varchar"`
	CreatedAt        time.Time
	UpdatedAt        time.Time

	Agency         Agency         `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	ProjectRequest ProjectRequest `gorm:"foreignKey:ProjectRequestID;constraint:OnDelete:CASCADE"`
	Client         User           `gorm:"foreignKey:ClientID;constraint:OnDelete:CASCADE"`

	// Relations
	ProjectMembers []ProjectMember `gorm:"foreignKey:ProjectID"`
	Milestones     []Milestone     `gorm:"foreignKey:ProjectID"`
	Tasks          []Task          `gorm:"foreignKey:ProjectID"`
	BugReports     []BugReport     `gorm:"foreignKey:ProjectID"`
	Comments       []Comment       `gorm:"foreignKey:ProjectID"`
	Files          []File          `gorm:"foreignKey:ProjectID"`
	Invoices       []Invoice       `gorm:"foreignKey:ProjectID"`
}
