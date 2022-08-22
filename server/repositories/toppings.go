package repositories

import (
	"waysbuck/models"

	"gorm.io/gorm"
)

type ToppingRepository interface {
	FindToppings() ([]models.Topping, error)
	GetTopping(ID int) (models.Topping, error)
	CreateTopping(topping models.Topping) (models.Topping, error)
	UpdateTopping(topping models.Topping) (models.Topping, error)
	DeleteTopping(topping models.Topping) (models.Topping, error)
}

type repositoryTopping struct {
	db *gorm.DB
}

func RepositoryTopping(db *gorm.DB) *repositoryTopping {
	return &repositoryTopping{db}
}

func (r *repositoryTopping) FindToppings() ([]models.Topping, error) {
	var toppings []models.Topping
	err := r.db.Find(&toppings).Error

	return toppings, err
}

func (r *repositoryTopping) GetTopping(ID int) (models.Topping, error) {
	var topping models.Topping
	err := r.db.First(&topping, ID).Error

	return topping, err
}

func (r *repositoryTopping) CreateTopping(topping models.Topping) (models.Topping, error) {
	err := r.db.Create(&topping).Error

	return topping, err
}

func (r *repositoryTopping) UpdateTopping(topping models.Topping) (models.Topping, error) {
	err := r.db.Debug().Save(&topping).Error

	return topping, err
}

func (r *repositoryTopping) DeleteTopping(topping models.Topping) (models.Topping, error) {
	err := r.db.Delete(&topping).Error

	return topping, err
}
