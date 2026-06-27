package database

import (
	"log"
	"os"

	"backend/resource/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() *gorm.DB {
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect:", err)
	}

	DB = db
	log.Println("Database connected to schema public")
	return db
}

func RunMigrations(db *gorm.DB) {
	if err := db.AutoMigrate(
		&models.Agency{},
		&models.SocialMedia{},
		&models.User{},
		&models.ProjectRequest{},
		&models.Project{},
		&models.ProjectMember{},
		&models.Milestone{},
		&models.Task{},
		&models.Subtask{},
		&models.TimeLog{},
		&models.BugReport{},
		&models.Comment{},
		&models.File{},
		&models.Invoice{},
		&models.Notification{},
		&models.ActivityLog{},
		&models.Subscription{},
		&models.Payment{},
		&models.Announcement{},
	); err != nil {
		log.Fatal("Migration failed:", err)
	}
	log.Println("Database migration completed")
}
