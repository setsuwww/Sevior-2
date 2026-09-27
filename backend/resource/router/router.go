package router

import (
	"backend/resource/controllers"
	"backend/resource/middleware"
	"backend/resource/services"

	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	r.Static("/uploads", "./uploads")

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	authService := services.NewAuthService(db)
	authCtrl := controllers.NewAuthController(authService)

	authPublic := r.Group("/auth")
	authPublic.POST("/register/client", authCtrl.RegisterClient)
	authPublic.POST("/register/agency", authCtrl.RegisterAgency)
	authPublic.POST("/login", authCtrl.Login)
	authPublic.POST("/refresh", authCtrl.RefreshToken)
	authPublic.POST("/logout", authCtrl.Logout)
	authPublic.POST("/forgot-password", authCtrl.ForgotPassword)
	authPublic.POST("/reset-password", authCtrl.ResetPassword)

	authProtected := r.Group("/auth")
	authProtected.Use(middleware.AuthMiddleware(db))
	authProtected.GET("/me", authCtrl.Me)

	AgencyAdminRoutes(r, db)

	ClientRouter(r, db)

	return r
}
