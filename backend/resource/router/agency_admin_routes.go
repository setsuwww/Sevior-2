package router

import (
	adminCtrl "backend/resource/controllers/admin"
	"backend/resource/middleware"
	adminModel "backend/resource/models"
	adminRepo "backend/resource/repositories/admin"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AgencyAdminRoutes(r *gin.Engine, db *gorm.DB) {
	profileRepo := &adminRepo.ProfileRepository{
		DB: db,
	}

	profileService := &adminService.ProfileService{
		Repo: profileRepo,
	}

	profileController := &adminCtrl.ProfileController{
		Service: profileService,
	}

	subscriptionRepo := &adminRepo.SubscriptionRepository{
		DB: db,
	}

	subscriptionService := &adminService.SubscriptionService{
		Repo: subscriptionRepo,
	}

	subscriptionController := &adminCtrl.SubscriptionController{
		Service: subscriptionService,
	}

	developerRepo := &adminRepo.DeveloperRepository{
		DB: db,
	}

	developerService := &adminService.DeveloperService{
		Repo: developerRepo,
	}

	developerController := &adminCtrl.DeveloperController{
		Service: developerService,
	}

	// ==========================================================
	// ROUTES
	// ==========================================================

	adminGroup := r.Group("/api/v1/agency-admin")

	adminGroup.Use(
		middleware.AuthMiddleware(db),
		middleware.RoleMiddleware(adminModel.RoleAdmin),
	)

	{
		adminGroup.GET("/profile", profileController.GetProfile)
		adminGroup.PATCH("/profile", profileController.UpdateProfile)
		adminGroup.PATCH("/profile/password", profileController.ChangePassword)
		adminGroup.PATCH("/profile/image", profileController.UploadUserProfileImage)
		adminGroup.PATCH("/profile/agency-image", profileController.UploadAgencyProfileImage)
		adminGroup.DELETE("/profile", profileController.DeleteAccount)

		adminGroup.GET("/subscription", subscriptionController.GetSubscription)

		adminGroup.GET("/developers", developerController.GetDevelopers)
		adminGroup.GET("/developers/:id", developerController.GetDeveloperByID)
		adminGroup.POST("/developers", developerController.CreateDeveloper)
		adminGroup.PATCH("/developers/:id", developerController.UpdateDeveloper)
		adminGroup.DELETE("/developers/:id", developerController.DeleteDeveloper)
	}

}
