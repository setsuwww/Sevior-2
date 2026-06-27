package agencyadmin

import (
	"backend/resource/models"
	"backend/resource/services/agencyadmin"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ClientController struct {
	Service *agencyadmin.ClientService
}

func (c *ClientController) GetClients(ctx *gin.Context) {
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
	sort := ctx.Query("sort")
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "10"))

	clients, total, err := c.Service.GetClients(*user.AgencyID, search, sort, page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":  clients,
		"total": total,
	})
}

func (c *ClientController) GetClient(ctx *gin.Context) {
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

	client, err := c.Service.GetClientByID(*user.AgencyID, uint(id))
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Client not found or access denied"})
		return
	}

	ctx.JSON(http.StatusOK, client)
}
