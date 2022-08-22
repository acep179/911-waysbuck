package toppingsdto

type CreateToppingRequest struct {
	Title string `json:"title" form:"title" validate:"required"`
	Price int    `json:"price" form:"price" validate:"required"`
	Image string `json:"image" form:"image" validate:"required"`
}

type UpdateToppingRequest struct {
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
}
