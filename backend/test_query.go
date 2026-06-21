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

	query := db.Model(&models.User{})

	var total, active, inactive int64
	query.Select("count(*) as total, COALESCE(sum(case when is_active = true then 1 else 0 end), 0) as active, COALESCE(sum(case when is_active = false or is_active is null then 1 else 0 end), 0) as inactive").
		Row().Scan(&total, &active, &inactive)

	var users []models.User
	query = query.Select("id", "full_name", "email", "phone", "role", "is_active", "created_at", "updated_at")
	
	err = query.Find(&users).Error
	if err != nil {
		log.Fatal(err)
	}

	b, _ := json.MarshalIndent(users[0], "", "  ")
	fmt.Println(string(b))
}
