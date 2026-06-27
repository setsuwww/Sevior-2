package superadmin

import (
	"net/http"
	"strconv"

	service "backend/resource/services/superadmin"

	"github.com/gin-gonic/gin"
)

type AgencyController struct {
	Service service.AgencyService
}

func NewAgencyController(s service.AgencyService) *AgencyController {
	return &AgencyController{Service: s}
}

func (ctrl *AgencyController) GetAgencies(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	search := c.Query("search")
	subscriptionFilter := c.Query("subscription")
	sort := c.Query("sort")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	response, err := ctrl.Service.GetAgencies(page, limit, search, subscriptionFilter, sort)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch agencies"})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (ctrl *AgencyController) GetAgency(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	agency, err := ctrl.Service.GetAgencyByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Agency not found"})
		return
	}

	c.JSON(http.StatusOK, agency)
}

func (ctrl *AgencyController) UpdateAgencyStatus(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var input struct {
		IsActive bool `json:"is_active"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := ctrl.Service.UpdateAgencyStatus(uint(id), input.IsActive); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update agency status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Agency status updated successfully"})
}

func (ctrl *AgencyController) DeleteAgency(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ctrl.Service.DeleteAgency(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete agency"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Agency deleted successfully"})
}
