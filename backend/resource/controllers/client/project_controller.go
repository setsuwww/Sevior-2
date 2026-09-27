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

func (c *ProjectController) getCurrentClient(ctx *gin.Context) (*clientModel.User, bool) {
	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return nil, false
	}

	user, ok := currentUser.(clientModel.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return nil, false
	}

	if user.ID == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return nil, false
	}

	return &user, true
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

		case "minimum budget cannot be greater than maximum budget",
			"invalid deadline format":
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

	var deadline *string

	if projectRequest.Deadline != nil {
		formattedDeadline := projectRequest.Deadline.Format("2006-01-02")
		deadline = &formattedDeadline
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
		Deadline:      deadline,
		AttachmentURL: projectRequest.AttachmentURL,
		Status:        projectRequest.Status,
		CreatedAt:     projectRequest.CreatedAt,
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "Project request created successfully",
		"data":    response,
	})
}

func (c *ProjectController) GetMyProjectRequests(ctx *gin.Context) {

	user, ok := c.getCurrentClient(ctx)

	if !ok {
		return
	}

	view := ctx.DefaultQuery("view", "pending")

	requests, err := c.Service.GetMyProjectRequests(
		user.ID,
		view,
	)

	if err != nil {
		if err.Error() == "invalid project request view" {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch project requests",
		})
		return
	}

	response := make([]clientDTO.ProjectRequestResponse, 0, len(requests))

	for _, request := range requests {

		var deadline *string

		if request.Deadline != nil {
			formatted := request.Deadline.Format("2006-01-02")
			deadline = &formatted
		}

		response = append(response, clientDTO.ProjectRequestResponse{
			ID:            request.ID,
			AgencyID:      *request.AgencyID,
			ClientID:      *request.ClientID,
			Title:         request.Title,
			Description:   request.Description,
			Category:      request.Category,
			BudgetMin:     request.BudgetMin,
			BudgetMax:     request.BudgetMax,
			Deadline:      deadline,
			AttachmentURL: request.AttachmentURL,
			Status:        request.Status,
			CreatedAt:     request.CreatedAt,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}

func (c *ProjectController) GetMyProjects(ctx *gin.Context) {

	user, ok := c.getCurrentClient(ctx)

	if !ok {
		return
	}

	projects, err := c.Service.GetMyProjects(user.ID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch projects",
		})
		return
	}

	response := make([]clientDTO.ProjectResponse, 0, len(projects))

	for _, project := range projects {

		var startDate *string
		var endDate *string

		if project.StartDate != nil {
			formatted := project.StartDate.Format("2006-01-02")
			startDate = &formatted
		}

		if project.EndDate != nil {
			formatted := project.EndDate.Format("2006-01-02")
			endDate = &formatted
		}

		agencyID := uint(0)

		if project.AgencyID != nil {
			agencyID = *project.AgencyID
		}

		clientID := uint(0)

		if project.ClientID != nil {
			clientID = *project.ClientID
		}

		response = append(response, clientDTO.ProjectResponse{
			ID:               project.ID,
			ProjectRequestID: project.ProjectRequestID,
			AgencyID:         agencyID,
			ClientID:         clientID,
			Title:            project.Title,
			Description:      project.Description,
			Budget:           project.Budget,
			Progress:         project.Progress,
			CurrentPhase:     project.CurrentPhase,
			StartDate:        startDate,
			EndDate:          endDate,
			Status:           project.Status,
			CreatedAt:        project.CreatedAt,
			UpdatedAt:        project.UpdatedAt,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}
