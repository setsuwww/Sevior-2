package main

import (
	"fmt"
	"log"

	"backend/resource/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "postgresql://neondb_owner:npg_mY1iOSzeLQs8@ep-frosty-morning-ahfhvovq.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	var users []models.User
	db.Select("id", "full_name", "email", "phone", "role", "is_active", "created_at", "updated_at").Find(&users)
	for _, u := range users {
		fmt.Printf("ID: %d, Email: %s, CreatedAt: %s, UpdatedAt: %s\n", u.ID, u.Email, u.CreatedAt, u.UpdatedAt)
	}
}
