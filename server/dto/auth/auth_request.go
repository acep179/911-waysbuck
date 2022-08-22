package authdto

type RegisterRequest struct {
	FullName string `json:"registerName" form:"name" validate:"required"`
	Email    string `json:"registerEmail" form:"email" validate:"required"`
	Password string `json:"registerPassword" form:"password" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"loginEmail" form:"email" validate:"required"`
	Password string `json:"loginPassword" form:"password" validate:"required"`
}
