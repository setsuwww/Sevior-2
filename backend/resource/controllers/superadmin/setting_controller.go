package superadmin

import (
	"net/http"
	"strconv"

	"backend/resource/models"
	service "backend/resource/services/superadmin"

	"github.com/gin-gonic/gin"
)

type SettingController struct {
	Service service.SettingService
}

func NewSettingController(s service.SettingService) *SettingController {
	return &SettingController{Service: s}
}

// Maintenance Mode
func (ctrl *SettingController) GetMaintenanceMode(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"is_active": ctrl.Service.GetMaintenanceMode()})
}

func (ctrl *SettingController) ToggleMaintenanceMode(c *gin.Context) {
	var input struct {
		IsActive bool `json:"is_active"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := ctrl.Service.SetMaintenanceMode(input.IsActive); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to toggle maintenance mode"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Maintenance mode toggled successfully", "is_active": input.IsActive})
}

// Audit Logs
func (ctrl *SettingController) GetAuditLogs(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	search := c.Query("search")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	response, err := ctrl.Service.GetAuditLogs(page, limit, search)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch audit logs"})
		return
	}

	c.JSON(http.StatusOK, response)
}

// Announcements
func (ctrl *SettingController) GetAnnouncements(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 10
	}

	response, err := ctrl.Service.GetAnnouncements(page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch announcements"})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (ctrl *SettingController) CreateAnnouncement(c *gin.Context) {
	var input struct {
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user from context (set by AuthMiddleware)
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	currentUser := user.(models.User)

	if err := ctrl.Service.CreateAnnouncement(input.Title, input.Content, currentUser.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create announcement"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Announcement created successfully"})
}

func (ctrl *SettingController) UpdateAnnouncement(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updates map[string]interface{}
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	delete(updates, "id")
	delete(updates, "created_by")

	if err := ctrl.Service.UpdateAnnouncement(uint(id), updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update announcement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Announcement updated successfully"})
}

func (ctrl *SettingController) DeleteAnnouncement(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ctrl.Service.DeleteAnnouncement(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete announcement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Announcement deleted successfully"})
}
