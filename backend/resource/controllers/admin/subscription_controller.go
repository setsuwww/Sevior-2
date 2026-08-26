package admin

import (
	"net/http"

	"backend/resource/models"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
)

type SubscriptionController struct {
	Service *adminService.SubscriptionService
}

func (c *SubscriptionController) GetSubscription(ctx *gin.Context) {
	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := currentUser.(models.User)

	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid user",
		})
		return
	}

	if user.AgencyID == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "User is not associated with an agency",
		})
		return
	}

	result, err := c.Service.GetSubscription(*user.AgencyID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, result)
}
