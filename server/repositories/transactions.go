package repositories

import (
	"waysbuck/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID string) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Carts.Product").Preload("Carts.Toppings").Preload("Buyer").Preload("Buyer.Profile").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Find(&transactions, ID).Error

	return transactions, err
}

// GetOneTransaction method here ...
func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID string) (models.Transaction, error) {
	var transaction models.Transaction

	r.db.First(&transaction, ID)

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return transaction, err
}
