package controllers

import (
	"backend/resource/models"
	"backend/resource/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Register Client
func RegisterClient(c *gin.Context, db *gorm.DB) {
	var input struct {
		FullName string `json:"full_name" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Phone    string `json:"phone"`
		Password string `json:"password" binding:"required,min=6"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if email exists
	var existing models.User
	if err := db.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	isActive := true
	user := models.User{
		FullName: input.FullName,
		Email:    input.Email,
		Phone:    input.Phone,
		Password: utils.HashPassword(input.Password),
		Role:     models.RoleClient,
		IsActive: &isActive,
	}

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)

	c.JSON(http.StatusCreated, gin.H{
		"user":         user,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}

// Register Agency
func RegisterAgency(c *gin.Context, db *gorm.DB) {
	var input struct {
		// User Info
		FullName string `json:"full_name" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Phone    string `json:"phone"`
		Password string `json:"password" binding:"required,min=6"`
		
		// Agency Info
		AgencyName        string `json:"agency_name" binding:"required"`
		AgencyDescription string `json:"agency_description"`
		Location          string `json:"location"`
		Website           string `json:"website"`
		SubscriptionPlan  string `json:"subscription_plan" binding:"required"` // free, team, company
	}
	
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate Plan
	if input.SubscriptionPlan != "free" && input.SubscriptionPlan != "team" && input.SubscriptionPlan != "company" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid subscription plan"})
		return
	}

	// Check if email exists
	var existing models.User
	if err := db.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	// Start Transaction
	tx := db.Begin()

	// Determine status
	status := "active"
	if input.SubscriptionPlan != "free" {
		status = "pending"
	}

	agency := models.Agency{
		AgencyName:         input.AgencyName,
		Description:        input.AgencyDescription,
		OwnerName:          input.FullName,
		Email:              input.Email,
		Contact:            input.Phone,
		Location:           input.Location,
		Website:            input.Website,
		SubscriptionPlan:   input.SubscriptionPlan,
		SubscriptionStatus: status,
		Status:             "active",
	}

	if err := tx.Create(&agency).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create agency"})
		return
	}

	isActive := true
	user := models.User{
		FullName: input.FullName,
		Email:    input.Email,
		Phone:    input.Phone,
		Password: utils.HashPassword(input.Password),
		Role:     models.RoleAdmin, // Agency owner is Admin
		AgencyID: &agency.ID,
		IsActive: &isActive,
	}

	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	tx.Commit()

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)

	c.JSON(http.StatusCreated, gin.H{
		"user":         user,
		"agency":       agency,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
		"message":      "Agency and Admin created successfully",
	})
}

// Login user
func Login(c *gin.Context, db *gorm.DB) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !utils.CheckPassword(user.Password, input.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if user.IsActive != nil && !*user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{"error": "Account is deactivated"})
		return
	}

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)

	c.JSON(http.StatusOK, gin.H{
		"user":         user,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}

// Refresh Token
func RefreshToken(c *gin.Context, db *gorm.DB) {
	var input struct {
		RefreshToken string `json:"refreshToken" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	claims, err := utils.ParseToken(input.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired refresh token"})
		return
	}

	if claims["type"] != "refresh" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token type"})
		return
	}

	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		return
	}
	userID := uint(userIDFloat)

	role, ok := claims["role"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		return
	}

	// Ensure user still exists and is active
	var user models.User
	if err := db.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	if user.IsActive != nil && !*user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{"error": "Account is deactivated"})
		return
	}

	// Generate new access token
	newAccessToken, _ := utils.GenerateToken(user.ID, role)
	
	c.JSON(http.StatusOK, gin.H{
		"accessToken": newAccessToken,
	})
}

// Get Current User
func Me(c *gin.Context) {
	userIface, exists := c.Get("currentUser")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	user := userIface.(models.User)
	c.JSON(http.StatusOK, gin.H{"user": user})
}
