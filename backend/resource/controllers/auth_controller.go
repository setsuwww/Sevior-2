package controllers

import (
	"backend/resource/models"
	"backend/resource/services"
	"backend/resource/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{
		authService: authService,
	}
}

func (ac *AuthController) setTokenCookie(c *gin.Context, token string, expires time.Time) {
	// Set HttpOnly cookie for Refresh Token
	c.SetCookie(
		"refresh_token",
		token,
		int(time.Until(expires).Seconds()),
		"/",
		"",    // domain
		false, // secure (should be true in prod HTTPS)
		true,  // httpOnly
	)
}

func (ac *AuthController) clearTokenCookie(c *gin.Context) {
	c.SetCookie(
		"refresh_token",
		"",
		-1,
		"/",
		"",
		false,
		true,
	)
}

func (ac *AuthController) RegisterClient(c *gin.Context) {
	var input struct {
		FullName string `json:"full_name" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := ac.authService.RegisterClient(input.FullName, input.Email, input.Password)
	if err != nil {
		status := http.StatusInternalServerError
		if err.Error() == "email already in use" {
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)
	ac.authService.StoreRefreshToken(user.ID, refreshToken)

	ac.setTokenCookie(c, refreshToken, time.Now().Add(time.Hour*24*7))

	c.JSON(http.StatusCreated, gin.H{
		"user":        user,
		"accessToken": accessToken,
	})
}

func (ac *AuthController) RegisterAgency(c *gin.Context) {
	var input struct {
		FullName          string `json:"full_name" binding:"required"`
		Email             string `json:"email" binding:"required,email"`
		Password          string `json:"password" binding:"required,min=6"`
		AgencyName        string `json:"agency_name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := ac.authService.RegisterAgencyOwner(input.FullName, input.Email, input.Password, input.AgencyName)
	if err != nil {
		status := http.StatusInternalServerError
		if err.Error() == "email already in use" {
			status = http.StatusConflict
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)
	ac.authService.StoreRefreshToken(user.ID, refreshToken)

	ac.setTokenCookie(c, refreshToken, time.Now().Add(time.Hour*24*7))

	c.JSON(http.StatusCreated, gin.H{
		"user":        user,
		"accessToken": accessToken,
		"message":     "Agency and Admin created successfully",
	})
}

func (ac *AuthController) Login(c *gin.Context) {
	var input struct {
		Email      string `json:"email" binding:"required,email"`
		Password   string `json:"password" binding:"required"`
		RememberMe bool   `json:"rememberMe"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := ac.authService.Login(input.Email, input.Password)
	if err != nil {
		status := http.StatusUnauthorized
		if err.Error() == "your account has been suspended" {
			status = http.StatusForbidden
		}
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	accessToken, _ := utils.GenerateToken(user.ID, user.Role)
	
	if input.RememberMe {
		refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)
		ac.authService.StoreRefreshToken(user.ID, refreshToken)
		ac.setTokenCookie(c, refreshToken, time.Now().Add(time.Hour*24*7))
	} else {
		// If not remember me, we can issue a session cookie or no refresh token at all.
		// For simplicity, we just issue a session cookie (expires when browser closes)
		refreshToken, _ := utils.GenerateRefreshToken(user.ID, user.Role)
		ac.authService.StoreRefreshToken(user.ID, refreshToken)
		c.SetCookie("refresh_token", refreshToken, 0, "/", "", false, true)
	}

	c.JSON(http.StatusOK, gin.H{
		"user":        user,
		"accessToken": accessToken,
	})
}

func (ac *AuthController) RefreshToken(c *gin.Context) {
	// Read from HttpOnly cookie
	tokenStr, err := c.Cookie("refresh_token")
	if err != nil || tokenStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No refresh token found"})
		return
	}

	claims, err := utils.ParseToken(tokenStr)
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

	// Generate new access token
	newAccessToken, _ := utils.GenerateToken(userID, role)
	
	// Option to rotate refresh token here
	newRefreshToken, _ := utils.GenerateRefreshToken(userID, role)
	ac.authService.DeleteRefreshToken(tokenStr)
	ac.authService.StoreRefreshToken(userID, newRefreshToken)
	ac.setTokenCookie(c, newRefreshToken, time.Now().Add(time.Hour*24*7))

	c.JSON(http.StatusOK, gin.H{
		"accessToken": newAccessToken,
	})
}

func (ac *AuthController) Logout(c *gin.Context) {
	tokenStr, _ := c.Cookie("refresh_token")
	if tokenStr != "" {
		ac.authService.DeleteRefreshToken(tokenStr)
	}
	ac.clearTokenCookie(c)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

func (ac *AuthController) ForgotPassword(c *gin.Context) {
	var input struct {
		Email string `json:"email" binding:"required,email"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := ac.authService.GeneratePasswordResetToken(input.Email)
	if err != nil {
		// Do not leak existence of email. Just return 200 OK.
		c.JSON(http.StatusOK, gin.H{"message": "If that email is in our database, we will send a password reset link."})
		return
	}

	// In a real app, send email here. For now, print to console.
	// fmt.Println("Password reset link: http://localhost:3000/reset-password?token=" + token)
	_ = token

	c.JSON(http.StatusOK, gin.H{
		"message": "If that email is in our database, we will send a password reset link.",
		"token": token, // FOR TESTING ONLY
	})
}

func (ac *AuthController) ResetPassword(c *gin.Context) {
	var input struct {
		Token    string `json:"token" binding:"required"`
		Password string `json:"password" binding:"required,min=6"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := ac.authService.ResetPassword(input.Token, input.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password reset successfully. You can now log in."})
}

func (ac *AuthController) Me(c *gin.Context) {
	userIface, exists := c.Get("currentUser")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	user := userIface.(models.User)
	c.JSON(http.StatusOK, gin.H{"user": user})
}
