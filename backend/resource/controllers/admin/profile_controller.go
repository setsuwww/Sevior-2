package admin

import (
	"net/http"

	"backend/resource/models"
	"backend/resource/services/admin"

	"github.com/gin-gonic/gin"
)

type ProfileController struct {
	Service *admin.ProfileService
}

func (c *ProfileController) GetProfile(ctx *gin.Context) {
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
			"error": "Invalid user session",
		})
		return
	}

	profile, err := c.Service.GetUserProfile(user.ID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":            profile.ID,
			"full_name":     profile.FullName,
			"email":         profile.Email,
			"phone":         profile.Phone,
			"profile_image": profile.ProfileImage,
			"biography":     profile.Biography,
			"role":          profile.Role,
			"is_active":     profile.IsActive,
			"last_login":    profile.LastLogin,
		},
		"agency": profile.Agency,
	})
}
