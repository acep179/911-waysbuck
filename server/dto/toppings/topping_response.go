package toppingsdto

type ToppingResponse struct {
	ID    int    `json:"id"`
	Title string `json:"title" form:"title" validate:"required"`
	Price int    `json:"price"`
	Image string `json:"image" form:"image" validate:"required"`
}
