package main

import (
	"encoding/json"
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
	err = db.Model(&models.User{}).Select("id", "full_name", "email", "phone", "role", "is_active", "created_at", "updated_at").Find(&users).Error
	if err != nil {
		log.Fatal(err)
	}

	b, _ := json.MarshalIndent(users[0], "", "  ")
	fmt.Println(string(b))
}
