package models

import "time"

type TimeLog struct {
	ID          uint       `gorm:"primaryKey"`
	TaskID      *uint      `gorm:"index"`
	DeveloperID *uint      `gorm:"index"`
	StartedAt   *time.Time `gorm:"type:timestamp"`
	EndedAt     *time.Time `gorm:"type:timestamp"`
	TotalHours  *float64   `gorm:"type:decimal"`
	CreatedAt   time.Time

	Task      Task `gorm:"foreignKey:TaskID;constraint:OnDelete:CASCADE"`
	Developer User `gorm:"foreignKey:DeveloperID;constraint:OnDelete:CASCADE"`
}
