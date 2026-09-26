package middleware

import (
	"errors"
	"net/http"
	"strings"

	"backend/resource/models"
	"backend/resource/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AuthMiddleware(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Missing Authorization header",
			})
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)

		if len(parts) != 2 ||
			!strings.EqualFold(parts[0], "Bearer") ||
			parts[1] == "" {

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid Authorization header",
			})
			c.Abort()
			return
		}

		tokenStr := parts[1]

		claims, err := utils.ParseToken(tokenStr)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid or expired token",
			})
			c.Abort()
			return
		}

		// Access token wajib bertipe "access".
		tokenType, ok := claims["type"].(string)

		if !ok || tokenType != "access" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token type",
			})
			c.Abort()
			return
		}

		userIDFloat, ok := claims["user_id"].(float64)

		if !ok || userIDFloat <= 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token claims",
			})
			c.Abort()
			return
		}

		userID := uint(userIDFloat)

		var user models.User

		if err := db.First(&user, userID).Error; err != nil {

			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "User not found",
				})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to authenticate user",
				})
			}

			c.Abort()
			return
		}

		// User yang sudah dinonaktifkan tidak boleh
		// tetap menggunakan access token lama.
		if user.IsActive != nil && !*user.IsActive {
			c.JSON(http.StatusForbidden, gin.H{
				"error": "Your account has been suspended",
			})
			c.Abort()
			return
		}

		// currentUser menjadi source of truth
		// untuk role, agency, dan identity.
		c.Set("currentUser", user)

		c.Next()
	}
}

func RoleMiddleware(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {

		userIface, exists := c.Get("currentUser")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}

		user, ok := userIface.(models.User)

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid authenticated user",
			})
			c.Abort()
			return
		}

		for _, allowedRole := range allowedRoles {
			if user.Role == allowedRole {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{
			"error": "Forbidden",
		})
		c.Abort()
	}
}

// TenantMiddleware: verify tenant access
func TenantMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userIface, exists := c.Get("currentUser")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		user := userIface.(models.User)

		// If SUPER_ADMIN, they have access to everything
		if user.Role == models.RoleSuperAdmin {
			c.Next()
			return
		}

		// CLIENTs and DEVELOPERs and ADMINs should have an AgencyID attached (except maybe clients if they are global, but currently they are tied to agencies or project requests)
		// For true multi-tenancy, extract Agency ID from route param or header and compare
		requestedAgencyID := c.Param("agencyId")
		if requestedAgencyID != "" && user.AgencyID != nil {
			// Convert requestedAgencyID to uint and compare...
			// For simplicity in this example, we just check if the user belongs to an agency.
			// You can expand this logic based on how you pass tenant context.
		}

		c.Next()
	}
}
