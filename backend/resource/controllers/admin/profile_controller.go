package admin

import (
	"net/http"

	adminDTO "backend/resource/dto/admin"
	"backend/resource/models"
	adminService "backend/resource/services/admin"

	"github.com/gin-gonic/gin"
)

type ProfileController struct {
	Service *adminService.ProfileService
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

func (c *ProfileController) UpdateProfile(ctx *gin.Context) {

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

	var req adminDTO.UpdateProfileRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := c.Service.UpdateProfile(user.ID, req); err != nil {

		status := http.StatusInternalServerError

		switch err.Error() {
		case "full name is required", "email is required":
			status = http.StatusBadRequest
		case "email already in use", "agency slug already in use":
			status = http.StatusConflict
		}

		ctx.JSON(status, gin.H{
			"error": err.Error(),
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

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"profile": profile,
	})
}

func (c *ProfileController) ChangePassword(ctx *gin.Context) {

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

	var req adminDTO.ChangePasswordRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := c.Service.ChangePassword(user.ID, req); err != nil {

		status := http.StatusBadRequest

		if err.Error() != "current password is incorrect" &&
			err.Error() != "password confirmation does not match" &&
			err.Error() != "new password must be at least 6 characters" {
			status = http.StatusInternalServerError
		}

		ctx.JSON(status, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Password changed successfully",
	})
}
