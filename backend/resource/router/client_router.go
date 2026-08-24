package router

import (
	clientCtrl "backend/resource/controllers/client"
	"backend/resource/middleware"
	"backend/resource/models"
	clientRepo "backend/resource/repositories/client"
	clientSvc "backend/resource/services/client"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ClientRouter(r *gin.Engine, db *gorm.DB) {
	agencyRepo := &clientRepo.AgencyRepository{
		DB: db,
	}

	agencyService := &clientSvc.AgencyService{
		Repo: agencyRepo,
	}

	agencyController := &clientCtrl.AgencyController{
		Service: agencyService,
	}

	clientGroup := r.Group("/api/v1/client")
	clientGroup.Use(middleware.AuthMiddleware(db))
	clientGroup.Use(middleware.RoleMiddleware(models.RoleClient))

	{
		clientGroup.GET("/agencies", agencyController.GetAgencies)
	}
}
