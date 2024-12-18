package repository

import (
	"database/sql"
	"fmt"

	"greendeco-be/app/models"
	"greendeco-be/platform/database"
)

type CategoryRepository interface {
	Create(m *models.CreateCategory) error
	UpdateById(m *models.UpdateCategory) error
	FindById(id string) (*models.Category, error)
	Delete(id string) error
	All(limit, offset int) ([]*models.Category, error)
}

type CategoryRepo struct {
	db *database.DB
}

const (
	CategoryTable       = "categories"
	CategoryNameField   = "name"
	CategoryParentField = "parent"
)

var _ CategoryRepository = (*CategoryRepo)(nil)

func NewCategoryRepository(db *database.DB) CategoryRepository {
	return &CategoryRepo{db}
}

func (repo *CategoryRepo) Create(m *models.CreateCategory) error {
	query := fmt.Sprintf(`INSERT INTO "%s" (name) VALUES ($1)`, CategoryTable)
	_, err := repo.db.Exec(query, m.Name)
	return err
}

func (repo *CategoryRepo) UpdateById(m *models.UpdateCategory) error {
	query := fmt.Sprintf(`UPDATE "%s" SET name = $2 WHERE id = $1`, CategoryTable)
	_, err := repo.db.Exec(query, m.ID, m.Name)
	if err != nil {
		return err
	}

	return nil
}

func (repo *CategoryRepo) FindById(id string) (*models.Category, error) {
	query := fmt.Sprintf(`SELECT * FROM "%s" WHERE id = $1`, CategoryTable)
	category := models.NewCategory()
	err := repo.db.Get(category, query, id)
	if err == sql.ErrNoRows {
		return nil, models.ErrNotFound
	} else if err != nil {
		return nil, err
	}

	return category, nil
}

func (repo *CategoryRepo) Delete(id string) error {
	query := fmt.Sprintf(`DELETE FROM %s WHERE id = $1`, CategoryTable)
	_, err := repo.db.Exec(query, id)
	return err
}

func (repo *CategoryRepo) All(limit, offset int) ([]*models.Category, error) {
	categories := []*models.Category{}
	query := `SELECT * FROM "categories" LIMIT $1 OFFSET $2`
	if err := repo.db.Select(&categories, query, limit, 0); err != nil {
		return nil, err
	}

	return categories, nil
}
