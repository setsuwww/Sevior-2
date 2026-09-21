package admin

import (
	"net/http"
	"strconv"

	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
)

type ProjectController struct {
	Service *adminService.ProjectService
}

func (c *ProjectController) GetProjects(ctx *gin.Context) {
	agencyID, err := getAgencyID(ctx)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "unauthorized",
		})
		return
	}

	projects, err := c.ProjectService.GetProjects(agencyID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to get projects",
		})
		return
	}

	response := make([]ProjectResponse, 0, len(projects))

	for _, project := range projects {
		response = append(response, ProjectResponse{
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
	agencyID, err := getAgencyID(ctx)

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

	project, err := c.ProjectService.GetProject(
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
			"message": "failed to get project",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": ProjectResponse{
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
		},
	})
}

func (c *ProjectController) GetProjectDevelopers(ctx *gin.Context) {
	agencyID, err := getAgencyID(ctx)

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

	developers, err := c.ProjectService.GetProjectDevelopers(
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

	response := make([]ProjectDeveloperResponse, 0, len(developers))

	for _, developer := range developers {
		response = append(response, ProjectDeveloperResponse{
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
	agencyID, err := getAgencyID(ctx)

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

	var request AssignDeveloperRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err = c.ProjectService.AssignDeveloper(
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
	agencyID, err := getAgencyID(ctx)

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

	err = c.ProjectService.RemoveDeveloper(
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
