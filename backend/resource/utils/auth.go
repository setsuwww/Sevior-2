package utils

import (
	"errors"
	"net/http"

	adminModel "backend/resource/models"

	"github.com/gin-gonic/gin"
)

func RequireAgency() gin.HandlerFunc {
	return func(c *gin.Context) {

		userIface, exists := c.Get("currentUser")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}

		user, ok := userIface.(adminModel.User)

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid authenticated user",
			})
			c.Abort()
			return
		}

		// SUPER_ADMIN tidak wajib memiliki AgencyID.
		if user.Role != adminModel.RoleSuperAdmin &&
			user.AgencyID == nil {

			c.JSON(http.StatusForbidden, gin.H{
				"error": "User is not associated with an agency",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

func GetAgencyID(ctx *gin.Context) (uint, error) {
	currentUser, exists := ctx.Get("currentUser")

	if !exists {
		return 0, errors.New("unauthorized")
	}

	user, ok := currentUser.(adminModel.User)

	if !ok {
		return 0, errors.New("invalid user")
	}

	if user.AgencyID == nil {
		return 0, errors.New("agency not found")
	}

	return *user.AgencyID, nil
}
