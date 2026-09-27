package router

import (
	clientCtrl "backend/resource/controllers/client"
	"backend/resource/middleware"
	clientModel "backend/resource/models"
	clientRepo "backend/resource/repositories/client"
	clientService "backend/resource/services/client"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ClientRouter(r *gin.Engine, db *gorm.DB) {

	agencyRepo := &clientRepo.AgencyRepository{DB: db}
	projectRepo := &clientRepo.ProjectRepository{DB: db}

	agencyService := &clientService.AgencyService{Repo: agencyRepo}
	projectService := &clientService.ProjectService{Repo: projectRepo}

	agencyController := &clientCtrl.AgencyController{Service: agencyService}
	projectController := &clientCtrl.ProjectController{Service: projectService}

	clientGroup := r.Group("/api/v1/client")
	clientGroup.Use(
		middleware.AuthMiddleware(db),
		middleware.RoleMiddleware(clientModel.RoleClient),
	)

	{
		clientGroup.GET("/agencies", agencyController.GetAgencies)

		clientGroup.POST("/project-requests", projectController.CreateProjectRequest)
		clientGroup.GET("/project-requests", projectController.GetMyProjectRequests)
		clientGroup.GET("/projects", projectController.GetMyProjects)
	}
}
