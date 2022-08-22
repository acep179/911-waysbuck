package usersdto

type CreateUserRequest struct {
	FullName string `json:"fullName" form:"name" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Status   string `json:"status" form:"status"`
}

type UpdateUserRequest struct {
	FullName string `json:"fullName" form:"name"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}
