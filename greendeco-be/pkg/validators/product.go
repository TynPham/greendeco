package validators

import (
	"greendeco-be/app/repository"
	"greendeco-be/platform/database"
	"github.com/google/uuid"
)

// ValidateActiveProduct() use to validate if variant is actived and product is  published
func ValidateActiveVariant(variantId uuid.UUID) bool {
	variantRepo := repository.NewVariantRepo(database.GetDB())
	variant, err := variantRepo.FindById(variantId)
	if err != nil {
		return false
	}

	productRepo := repository.NewProductRepo(database.GetDB())
	product, err := productRepo.FindById(variant.Product)
	if err != nil {
		return false
	}

	if variant.Available && product.Available && product.IsPublish {
		return true
	}

	return false
}
