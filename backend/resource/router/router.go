package router

import (
	"backend/resource/controllers"
	"backend/resource/controllers/admin"
	"backend/resource/middleware"

	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/register", func(c *gin.Context) { controllers.Register(c, db) })
	r.POST("/login", func(c *gin.Context) { controllers.Login(c, db) })

	auth := r.Group("/auth")
	auth.Use(middleware.AuthMiddleware(db))
	auth.GET("/me", controllers.Me)

	adminGroup := r.Group("/admin")
	adminGroup.Use(middleware.AuthMiddleware(db), middleware.RoleMiddleware(
		"SUPER_ADMIN",
		"ADMIN",
	))
	{
		uc := &admin.UserController{DB: db}
		adminGroup.GET("/users", uc.GetUsers)
		adminGroup.GET("/users/:id", uc.GetUser)
		adminGroup.POST("/users", uc.CreateUser)
		adminGroup.PATCH("/users/:id", uc.UpdateUser)
		adminGroup.DELETE("/users/:id", uc.DeleteUser)
	}

	return r
}
