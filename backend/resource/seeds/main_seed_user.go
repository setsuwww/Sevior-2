package seeds

import (
	"log"

	"backend/resource/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func UsersSeed(db *gorm.DB) {
	users := []models.User{
		{FullName: "Super Admin", Email: "superadmin@example.com", Role: models.RoleSuperAdmin, Password: "password123"},
		{FullName: "Admin", Email: "admin@example.com", Role: models.RoleAdmin, Password: "password123"},
		{FullName: "Developer", Email: "developer@example.com", Role: models.RoleDeveloper, Password: "password123"},
		{FullName: "Client", Email: "client@example.com", Role: models.RoleClient, Password: "password123"},
	}

	for _, u := range users {
		var existing models.User
		if err := db.Where("email = ?", u.Email).First(&existing).Error; err == nil {
			log.Println("User already exists:", u.Email)
			continue
		}

		hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		u.Password = string(hashed)

		if err := db.Create(&u).Error; err != nil {
			log.Println("Failed creating user:", u.Email, err)
		} else {
			log.Println("Created user:", u.Email, "with role", u.Role)
		}
	}
	log.Println("Seeding users done!")
}
