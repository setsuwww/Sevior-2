package client

import (
	clientService "backend/resource/services/client"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type AgencyController struct {
	Service *clientService.AgencyService
}

func (c *AgencyController) GetAgencies(ctx *gin.Context) {
	page := 1
	limit := 6

	// Parse page
	if pageParam := ctx.Query("page"); pageParam != "" {
		parsedPage, err := strconv.Atoi(pageParam)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid page parameter",
			})
			return
		}

		page = parsedPage
	}

	// Parse limit
	if limitParam := ctx.Query("limit"); limitParam != "" {
		parsedLimit, err := strconv.Atoi(limitParam)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid limit parameter",
			})
			return
		}

		limit = parsedLimit
	}

	agencies, err := c.Service.GetAgencies(
		page,
		limit,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch agencies",
		})
		return
	}

	ctx.JSON(http.StatusOK, agencies)
}
