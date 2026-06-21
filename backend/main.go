package main

import (
	"log"

	"github.com/joho/godotenv"

	"backend/resource/database"
	"backend/resource/router"
	"backend/resource/seeds"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println(".env not found, using system environment")
	}

	db := database.Connect()
	database.RunMigrations(db)
	seeds.UsersSeed(db)

	r := router.SetupRouter(db)

	log.Println("Application started successfully")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
