package models

import "time"

type BugReport struct {
	ID          uint   `gorm:"primaryKey"`
	ProjectID   *uint  `gorm:"index"`
	TaskID      *uint  `gorm:"index"`
	ReportedBy  *uint  `gorm:"index"`
	AssignedTo  *uint  `gorm:"index"`
	Title       string `gorm:"type:varchar"`
	Description string `gorm:"type:text"`
	Severity    string `gorm:"type:varchar"`
	Status      string `gorm:"type:varchar"`
	CreatedAt   time.Time
	UpdatedAt   time.Time

	Project  Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Task     Task    `gorm:"foreignKey:TaskID;constraint:OnDelete:CASCADE"`
	Reporter User    `gorm:"foreignKey:ReportedBy;constraint:OnDelete:CASCADE"`
	Assignee User    `gorm:"foreignKey:AssignedTo;constraint:OnDelete:CASCADE"`
}
