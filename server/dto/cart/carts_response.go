package cartsdto

type CartResponse struct {
	ID      int    `json:"id"`
	Product string `json:"product" form:"product" validate:"required"`
	Topping string `json:"topping"  form:"image" validate:"required"`
}
