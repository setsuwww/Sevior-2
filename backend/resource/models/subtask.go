package models

import "time"

type Subtask struct {
	ID        uint   `gorm:"primaryKey"`
	TaskID    *uint  `gorm:"index"`
	Title     string `gorm:"type:varchar"`
	Status    string `gorm:"type:varchar"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Task Task `gorm:"foreignKey:TaskID;constraint:OnDelete:CASCADE"`
}
