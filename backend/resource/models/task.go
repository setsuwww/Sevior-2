package models

import "time"

type Task struct {
	ID             uint       `gorm:"primaryKey"`
	AgencyID       *uint      `gorm:"index"`
	ProjectID      *uint      `gorm:"index"`
	MilestoneID    *uint      `gorm:"index"`
	AssignedTo     *uint      `gorm:"index"`
	Title          string     `gorm:"type:varchar"`
	Description    string     `gorm:"type:text"`
	Priority       string     `gorm:"type:varchar"`
	Status         string     `gorm:"type:varchar"`
	EstimatedHours *float64   `gorm:"type:decimal"`
	DueDate        *time.Time `gorm:"type:date"`
	CreatedAt      time.Time
	UpdatedAt      time.Time

	Agency     Agency    `gorm:"foreignKey:AgencyID;constraint:OnDelete:CASCADE"`
	Project    Project   `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Milestone  Milestone `gorm:"foreignKey:MilestoneID;constraint:OnDelete:CASCADE"`
	Assignee   User      `gorm:"foreignKey:AssignedTo;constraint:OnDelete:CASCADE"`

	// Relations
	Subtasks   []Subtask   `gorm:"foreignKey:TaskID"`
	TimeLogs   []TimeLog   `gorm:"foreignKey:TaskID"`
	BugReports []BugReport `gorm:"foreignKey:TaskID"`
	Comments   []Comment   `gorm:"foreignKey:TaskID"`
}
