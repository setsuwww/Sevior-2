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

	// ==========================================
	// REPOSITORIES
	// ==========================================

	dashRepo := &repo.DashboardRepository{DB: db}
	devRepo := &repo.DeveloperRepository{DB: db}
	clientRepo := &repo.ClientRepository{DB: db}
	profileRepo := &repo.ProfileRepository{DB: db}

	// ==========================================
	// SERVICES
	// ==========================================

	dashService := &service.DashboardService{Repo: dashRepo}
	devService := &service.DeveloperService{Repo: devRepo}
	clientService := &service.ClientService{Repo: clientRepo}
	profileService := service.NewProfileService(profileRepo)

	// ==========================================
	// CONTROLLERS
	// ==========================================

	dashCtrl := &admin.DashboardController{Service: dashService}
	devCtrl := &admin.DeveloperController{Service: devService}
	clientCtrl := &admin.ClientController{Service: clientService}
	profileCtrl := &admin.ProfileController{Service: profileService}

	// ==========================================
	// ROUTES
	// ==========================================

	adminGroup := r.Group("/api/v1/agency-admin")
	adminGroup.Use(middleware.AuthMiddleware(db), middleware.RoleMiddleware(models.RoleAdmin))
	{
		// Dashboard
		adminGroup.GET("/dashboard/stats", dashCtrl.GetStats)
		// Developers
		adminGroup.GET("/users/developers", devCtrl.GetDevelopers)
		adminGroup.POST("/users/developers", devCtrl.CreateDeveloper)
		adminGroup.GET("/users/developers/:id", devCtrl.GetDeveloper)
		adminGroup.PATCH("/users/developers/:id", devCtrl.UpdateDeveloper)
		adminGroup.DELETE("/users/developers/:id", devCtrl.DeleteDeveloper)
		// Clients
		adminGroup.GET("/users/clients", clientCtrl.GetClients)
		adminGroup.GET("/users/clients/:id", clientCtrl.GetClient)
		// Profile
		adminGroup.GET("/profile", profileCtrl.GetProfile)
		adminGroup.PATCH("/profile", profileCtrl.UpdateProfile)
		adminGroup.PATCH("/profile/password", profileCtrl.ChangePassword)

	}
}
