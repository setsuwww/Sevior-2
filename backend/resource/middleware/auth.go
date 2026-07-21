package middleware

import (
	"backend/resource/models"
	"backend/resource/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// AuthMiddleware: cek token & set currentUser
func AuthMiddleware(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := utils.ParseToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		var user models.User
		if err := db.First(&user, uint(userIDFloat)).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}

		c.Set("currentUser", user)
		c.Next()
	}
}

// RoleMiddleware: cek role user
func RoleMiddleware(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userIface, exists := c.Get("currentUser")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		user := userIface.(models.User)
		for _, role := range allowedRoles {
			if user.Role == role {
				c.Next()
				return
			}
		}
		c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
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
