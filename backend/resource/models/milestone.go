package models

import "time"

type Milestone struct {
	ID          uint       `gorm:"primaryKey"`
	ProjectID   *uint      `gorm:"index"`
	Title       string     `gorm:"type:varchar"`
	Description string     `gorm:"type:text"`
	Progress    *int       `gorm:"type:int"`
	DueDate     *time.Time `gorm:"type:date"`
	Status      string     `gorm:"type:varchar"`
	CreatedAt   time.Time
	UpdatedAt   time.Time

	Project Project `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE"`
	Tasks   []Task  `gorm:"foreignKey:MilestoneID"`
}
