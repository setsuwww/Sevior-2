package router

import (
	"backend/resource/controllers/admin"
	"backend/resource/middleware"
	"backend/resource/models"

	repo "backend/resource/repositories/admin"
	service "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AgencyAdminRoutes(r *gin.Engine, db *gorm.DB) {
	// Initialize Repositories
	dashRepo := &repo.DashboardRepository{DB: db}
	devRepo := &repo.DeveloperRepository{DB: db}
	clientRepo := &repo.ClientRepository{DB: db}
	profileRepo := &repo.ProfileRepository{DB: db}

	// Initialize Services
	dashService := &service.DashboardService{Repo: dashRepo}
	devService := &service.DeveloperService{Repo: devRepo}
	clientService := &service.ClientService{Repo: clientRepo}
	profileService := &service.ProfileService{Repo: profileRepo}

	// Initialize Controllers
	dashCtrl := &admin.DashboardController{Service: dashService}
	devCtrl := &admin.DeveloperController{Service: devService}
	clientCtrl := &admin.ClientController{Service: clientService}
	profileCtrl := &admin.ProfileController{Service: profileService}

	adminGroup := r.Group("/api/v1/agency-admin")
	adminGroup.Use(middleware.AuthMiddleware(db))
	adminGroup.Use(middleware.RoleMiddleware(models.RoleAdmin))
	{
		adminGroup.GET("/dashboard/stats", dashCtrl.GetStats)

		adminGroup.GET("/users/developers", devCtrl.GetDevelopers)
		adminGroup.POST("/users/developers", devCtrl.CreateDeveloper)
		adminGroup.GET("/users/developers/:id", devCtrl.GetDeveloper)
		adminGroup.PATCH("/users/developers/:id", devCtrl.UpdateDeveloper)
		adminGroup.DELETE("/users/developers/:id", devCtrl.DeleteDeveloper)

		adminGroup.GET("/users/clients", clientCtrl.GetClients)
		adminGroup.GET("/users/clients/:id", clientCtrl.GetClient)

		adminGroup.GET("/profile", profileCtrl.GetProfile)
	}
}
