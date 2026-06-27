package superadmin

import (
	"net/http"
	"strconv"

	service "backend/resource/services/superadmin"

	"github.com/gin-gonic/gin"
)

type ProjectController struct {
	Service service.ProjectService
}

func NewProjectController(s service.ProjectService) *ProjectController {
	return &ProjectController{Service: s}
}

func (ctrl *ProjectController) GetProjects(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	search := c.Query("search")
	filter := c.Query("filter") // Pending, Discussion, Approved, etc.
	sort := c.Query("sort")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	response, err := ctrl.Service.GetProjects(page, limit, search, filter, sort)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (ctrl *ProjectController) GetProject(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	project, err := ctrl.Service.GetProjectByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}
