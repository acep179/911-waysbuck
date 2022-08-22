package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName" form:"name" validate:"required"`
	Email    string `json:"email"  form:"email" validate:"required"`
	Status   string `json:"status" form:"status" validate:"required"`
}
