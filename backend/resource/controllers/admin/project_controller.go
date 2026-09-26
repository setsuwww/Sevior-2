package admin

import (
	"errors"
	"net/http"
	"strconv"

	adminDTO "backend/resource/dto/admin"
	adminModel "backend/resource/models"
	adminService "backend/resource/services/admin"
	adminUtils "backend/resource/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProjectController struct {
	Service *adminService.ProjectService
}

func (c *ProjectController) GetProjects(ctx *gin.Context) {
	agencyID, err := adminUtils.GetAgencyID(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	projects, err := c.Service.GetProjects(agencyID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	response := make([]adminDTO.ProjectResponse, 0, len(projects))

	for _, project := range projects {
		response = append(response, adminDTO.ProjectResponse{
			ID:               project.ID,
			AgencyID:         agencyID,
			ProjectRequestID: project.ProjectRequestID,
			ClientID:         project.ClientID,
			Title:            project.Title,
			Description:      project.Description,
			Budget:           project.Budget,
			Progress:         project.Progress,
			CurrentPhase:     project.CurrentPhase,
			StartDate:        project.StartDate,
			EndDate:          project.EndDate,
			Status:           project.Status,
			CreatedAt:        project.CreatedAt,
			UpdatedAt:        project.UpdatedAt,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}

func (c *ProjectController) GetProject(ctx *gin.Context) {

	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Agency not found",
		})
		return
	}

	projectID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid project ID",
		})
		return
	}

	project, err := c.Service.GetProject(
		*user.AgencyID,
		uint(projectID),
	)

	if err != nil {

		if errors.Is(err, gorm.ErrRecordNotFound) ||
			err.Error() == "project not found" {

			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "Project not found",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, adminDTO.ProjectResponse{
		ID:               project.ID,
		AgencyID:         *user.AgencyID,
		ProjectRequestID: project.ProjectRequestID,
		ClientID:         project.ClientID,
		Title:            project.Title,
		Description:      project.Description,
		Budget:           project.Budget,
		Progress:         project.Progress,
		CurrentPhase:     project.CurrentPhase,
		StartDate:        project.StartDate,
		EndDate:          project.EndDate,
		Status:           project.Status,
		CreatedAt:        project.CreatedAt,
		UpdatedAt:        project.UpdatedAt,
	})
}

func (c *ProjectController) GetProjectDevelopers(ctx *gin.Context) {
	agencyID, err := adminUtils.GetAgencyID(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	projectID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid project id",
		})
		return
	}

	developers, err := c.Service.GetProjectDevelopers(
		agencyID,
		uint(projectID),
	)

	if err != nil {
		if err.Error() == "project not found" {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "project not found",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to get project developers",
		})
		return
	}

	response := make([]adminDTO.ProjectDeveloperResponse, 0, len(developers))

	for _, developer := range developers {
		response = append(response, adminDTO.ProjectDeveloperResponse{
			ID:           developer.ID,
			FullName:     developer.FullName,
			Email:        developer.Email,
			Phone:        developer.Phone,
			ProfileImage: developer.ProfileImage,
			Biography:    developer.Biography,
			IsActive:     developer.IsActive,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}

func (c *ProjectController) AssignDeveloper(ctx *gin.Context) {
	agencyID, err := adminUtils.GetAgencyID(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	projectID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid project id",
		})
		return
	}

	var request adminDTO.AssignDeveloperRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = c.Service.AssignDeveloper(
		agencyID,
		uint(projectID),
		request.DeveloperID,
	)

	if err != nil {
		switch err.Error() {
		case "project not found":
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "project not found",
			})
			return

		case "developer not found":
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "developer not found",
			})
			return

		case "developer is already assigned to this project":
			ctx.JSON(http.StatusConflict, gin.H{
				"message": err.Error(),
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to assign developer",
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "developer assigned successfully",
	})
}

func (c *ProjectController) RemoveDeveloper(ctx *gin.Context) {
	agencyID, err := adminUtils.GetAgencyID(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	projectID, err := strconv.ParseUint(
		ctx.Param("id"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid project id",
		})
		return
	}

	developerID, err := strconv.ParseUint(
		ctx.Param("developerId"),
		10,
		64,
	)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid developer id",
		})
		return
	}

	err = c.Service.RemoveDeveloper(
		agencyID,
		uint(projectID),
		uint(developerID),
	)

	if err != nil {
		if err.Error() == "project not found" {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "project not found",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to remove developer",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "developer removed successfully",
	})
}
