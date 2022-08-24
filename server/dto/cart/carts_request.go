package cartsdto

type CreateCartRequest struct {
	SubTotal  int   `json:"subtotal" validate:"required"`
	ProductID int   `json:"product_id" form:"product_id" validate:"required"`
	ToppingID []int `json:"topping_id" gorm:"-" validate:"required"`
}

type UpdateCartRequest struct {
	TransactionID int `json:"transaction_id"`
}
