package agencyadmin

import (
	"backend/resource/models"
	"backend/resource/services/agencyadmin"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DashboardController struct {
	Service *agencyadmin.DashboardService
}

func (c *DashboardController) GetStats(ctx *gin.Context) {
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

	stats, err := c.Service.GetDashboardStats(*user.AgencyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, stats)
}
