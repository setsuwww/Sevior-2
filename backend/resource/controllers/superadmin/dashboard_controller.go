package superadmin

import (
	"net/http"

	service "backend/resource/services/superadmin"

	"github.com/gin-gonic/gin"
)

type DashboardController struct {
	Service service.DashboardService
}

func NewDashboardController(s service.DashboardService) *DashboardController {
	return &DashboardController{Service: s}
}

func (ctrl *DashboardController) GetDashboardSummary(c *gin.Context) {
	summary, err := ctrl.Service.GetDashboardSummary()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch dashboard summary"})
		return
	}

	c.JSON(http.StatusOK, summary)
}
