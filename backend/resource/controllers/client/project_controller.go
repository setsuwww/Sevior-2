package client

import (
	clientDTO "backend/resource/dto/client"
	clientModel "backend/resource/models"
	clientService "backend/resource/services/client"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProjectController struct {
	Service *clientService.ProjectService
}

func (c *ProjectController) CreateProjectRequest(ctx *gin.Context) {
	var input clientDTO.CreateProjectRequest

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	currentUser, exists := ctx.Get("currentUser")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(clientModel.User)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.ID == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	projectRequest, err := c.Service.CreateProjectRequest(
		user.ID,
		input,
	)

	if err != nil {
		switch err.Error() {
		case "agency not found":
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": err.Error(),
			})

		case "minimum budget cannot be greater than maximum budget":
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

		default:
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create project request",
			})
		}

		return
	}

	response := clientDTO.ProjectRequestResponse{
		ID:            projectRequest.ID,
		AgencyID:      *projectRequest.AgencyID,
		ClientID:      *projectRequest.ClientID,
		Title:         projectRequest.Title,
		Description:   projectRequest.Description,
		Category:      projectRequest.Category,
		BudgetMin:     projectRequest.BudgetMin,
		BudgetMax:     projectRequest.BudgetMax,
		Deadline:      projectRequest.Deadline,
		AttachmentURL: projectRequest.AttachmentURL,
		Status:        projectRequest.Status,
		CreatedAt:     projectRequest.CreatedAt,
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "Project request created successfully",
		"data":    response,
	})
}
