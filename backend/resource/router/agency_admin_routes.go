package router

import (
	"backend/resource/controllers/admin"
	"backend/resource/middleware"
	"backend/resource/models"
	adminRepo "backend/resource/repositories/admin"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AgencyAdminRoutes(
	r *gin.Engine,
	db *gorm.DB,
) {
	// ==========================================================
	// PROFILE
	// ==========================================================

	profileRepo := &adminRepo.ProfileRepository{
		DB: db,
	}

	profileService := &adminService.ProfileService{
		Repo: profileRepo,
	}

	profileController := &admin.ProfileController{
		Service: profileService,
	}

	// ==========================================================
	// SUBSCRIPTION
	// ==========================================================

	subscriptionRepo := &adminRepo.SubscriptionRepository{
		DB: db,
	}

	subscriptionService := &adminService.SubscriptionService{
		Repo: subscriptionRepo,
	}

	subscriptionController := &admin.SubscriptionController{
		Service: subscriptionService,
	}

	// ==========================================================
	// ROUTES
	// ==========================================================

	adminGroup := r.Group("/api/v1/agency-admin")

	adminGroup.Use(
		middleware.AuthMiddleware(db),
		middleware.RoleMiddleware(models.RoleAdmin),
	)

	{
		// Profile
		adminGroup.GET(
			"/profile",
			profileController.GetProfile,
		)

		adminGroup.PATCH(
			"/profile",
			profileController.UpdateProfile,
		)

		adminGroup.PATCH(
			"/profile/password",
			profileController.ChangePassword,
		)

		adminGroup.PATCH(
			"/profile/image",
			profileController.UploadUserProfileImage,
		)

		adminGroup.PATCH(
			"/profile/agency-image",
			profileController.UploadAgencyProfileImage,
		)

		adminGroup.DELETE(
			"/profile",
			profileController.DeleteAccount,
		)

		// Subscription
		adminGroup.GET(
			"/subscription",
			subscriptionController.GetSubscription,
		)
	}
}
