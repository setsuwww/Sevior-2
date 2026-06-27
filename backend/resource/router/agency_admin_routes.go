package router

import (
	"backend/resource/controllers/agencyadmin"
	repo "backend/resource/repositories/agencyadmin"
	service "backend/resource/services/agencyadmin"
	"backend/resource/middleware"
	"backend/resource/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AgencyAdminRoutes(r *gin.Engine, db *gorm.DB) {
	// Initialize Repositories
	dashRepo := &repo.DashboardRepository{DB: db}
	devRepo := &repo.DeveloperRepository{DB: db}
	clientRepo := &repo.ClientRepository{DB: db}

	// Initialize Services
	dashService := &service.DashboardService{Repo: dashRepo}
	devService := &service.DeveloperService{Repo: devRepo}
	clientService := &service.ClientService{Repo: clientRepo}

	// Initialize Controllers
	dashCtrl := &agencyadmin.DashboardController{Service: dashService}
	devCtrl := &agencyadmin.DeveloperController{Service: devService}
	clientCtrl := &agencyadmin.ClientController{Service: clientService}

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
	}
}
