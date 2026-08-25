package admin

import (
	"net/http"

	"backend/resource/models"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
)

type ProfileController struct {
	Service *adminService.ProfileService
}

// ============================================================
// GET PROFILE
// ============================================================

func (c *ProfileController) GetProfile(
	ctx *gin.Context,
) {

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

	profile, err := c.Service.GetProfile(user.ID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, profile)
}

// ============================================================
// UPDATE PROFILE
// ============================================================

func (c *ProfileController) UpdateProfile(
	ctx *gin.Context,
) {

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

	var req adminService.UpdateProfileRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := c.Service.UpdateProfile(
		user.ID,
		req,
	); err != nil {

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
	})
}
