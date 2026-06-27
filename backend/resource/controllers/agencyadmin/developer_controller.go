package agencyadmin

import (
	"backend/resource/models"
	"backend/resource/services/agencyadmin"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type DeveloperController struct {
	Service *agencyadmin.DeveloperService
}

func (c *DeveloperController) GetDevelopers(ctx *gin.Context) {
	currentUser, exists := ctx.Get("currentUser")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	user := currentUser.(models.User)
	if user.AgencyID == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: No agency attached"})
		return
	}

	search := ctx.Query("search")
	status := ctx.Query("status")
	sort := ctx.Query("sort")
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "10"))

	developers, total, err := c.Service.GetDevelopers(*user.AgencyID, search, status, sort, page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":  developers,
		"total": total,
	})
}

func (c *DeveloperController) GetDeveloper(ctx *gin.Context) {
	currentUser, _ := ctx.Get("currentUser")
	user := currentUser.(models.User)
	if user.AgencyID == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		return
	}

	id, err := strconv.ParseUint(ctx.Param("id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	developer, err := c.Service.GetDeveloperByID(*user.AgencyID, uint(id))
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Developer not found"})
		return
	}

	ctx.JSON(http.StatusOK, developer)
}

func (c *DeveloperController) UpdateDeveloper(ctx *gin.Context) {
	currentUser, _ := ctx.Get("currentUser")
	user := currentUser.(models.User)
	if user.AgencyID == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		return
	}

	id, err := strconv.ParseUint(ctx.Param("id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updates map[string]interface{}
	if err := ctx.ShouldBindJSON(&updates); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.UpdateDeveloper(*user.AgencyID, uint(id), updates); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Developer updated successfully"})
}

func (c *DeveloperController) DeleteDeveloper(ctx *gin.Context) {
	currentUser, _ := ctx.Get("currentUser")
	user := currentUser.(models.User)
	if user.AgencyID == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		return
	}

	id, err := strconv.ParseUint(ctx.Param("id"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := c.Service.DeleteDeveloper(*user.AgencyID, uint(id)); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Developer deleted successfully"})
}

func (c *DeveloperController) CreateDeveloper(ctx *gin.Context) {
	currentUser, _ := ctx.Get("currentUser")
	user := currentUser.(models.User)
	if user.AgencyID == nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		return
	}

	var payload map[string]interface{}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.CreateDeveloper(*user.AgencyID, payload); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Developer created successfully"})
}
