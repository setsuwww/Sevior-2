package client

import (
	"backend/resource/services/client"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AgencyController struct {
	Service *client.AgencyService
}

func (c *AgencyController) GetAgencies(ctx *gin.Context) {
	agencies, err := c.Service.GetAgencies()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch agencies",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"agencies": agencies,
	})
}
