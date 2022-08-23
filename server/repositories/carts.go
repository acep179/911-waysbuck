package repositories

import (
	"waysbuck/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCarts() ([]models.Cart, error)
	FindCartsByUserID(userID int) ([]models.Cart, error)
	CreateCart(models.Cart) (models.Cart, error)
	FindToppingsID(ToppingID []int) ([]models.Topping, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCarts() ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Toppings").Find(&carts).Error

	return carts, err
}

func (r *repository) FindCartsByUserID(userID int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Toppings").Find(&carts, "user_id = ?", userID).Error

	return carts, err
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error

	return cart, err
}

func (r *repository) FindToppingsID(ToppingID []int) ([]models.Topping, error) {
	var toppings []models.Topping
	err := r.db.Debug().Find(&toppings, ToppingID).Error

	return toppings, err
}
