package cartsdto

type CartRequest struct {
	SubTotal  int   `json:"subtotal"`
	ProductID int   `json:"product_id" form:"product_id" validate:"required"`
	ToppingID []int `json:"topping_id" gorm:"-"`
}
