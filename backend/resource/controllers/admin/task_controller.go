package admin

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"backend/resource/models"
)

type TaskController struct {
	DB *gorm.DB
}

func NewTaskController(db *gorm.DB) *TaskController {
	return &TaskController{DB: db}
}

func (tc *TaskController) FetchAll(c *gin.Context) {

	orgIDRaw, exists := c.Get("organization_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "tenant not resolved"})
		return
	}
	orgID := orgIDRaw.(uuid.UUID)

	projectIDParam := c.Query("project_id")
	statusParam := c.Query("status")
	sortField := c.DefaultQuery("sort", "created_at")
	sortOrder := c.DefaultQuery("order", "desc")

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))

	offset := (page - 1) * limit

	var tasks []models.Task

	query := tc.DB.Model(&models.Task{}).
		Where("organization_id = ?", orgID)

	if projectIDParam != "" {
		projectUUID, err := uuid.Parse(projectIDParam)
		if err == nil {
			query = query.Where("project_id = ?", projectUUID)
		}
	}

	if statusParam != "" {
		query = query.Where("status = ?", statusParam)
	}

	var total int64
	query.Count(&total)

	allowedSort := map[string]bool{
		"created_at": true,
		"due_date":   true,
		"priority":   true,
	}

	if !allowedSort[sortField] {
		sortField = "created_at"
	}

	if sortOrder != "asc" {
		sortOrder = "desc"
	}

	query = query.
		Order(sortField + " " + sortOrder).
		Limit(limit).
		Offset(offset)

	if err := query.Find(&tasks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": tasks,
		"meta": gin.H{
			"total": total,
			"page":  page,
			"limit": limit,
		},
	})
}
