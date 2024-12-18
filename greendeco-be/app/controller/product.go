package controller

import (
	"fmt"

	"greendeco-be/app/models"
	"greendeco-be/app/repository"
	"greendeco-be/pkg/middlewares"
	"greendeco-be/pkg/validators"
	"greendeco-be/platform/database"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

// @CreateProduct() godoc
// @Summary create new product require admin permission
// @Tags Product
// @Param todo body models.CreateProduct true "New product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/ [post]
// @Security Bearer
func CreateProduct(c *fiber.Ctx) error {
	token, ok := c.Locals("user").(*jwt.Token)
	if !ok {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(models.ErrorResponse{
			Message: "can not parse token",
		})
	}

	if !middlewares.GetAdminFromToken(token) {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	newProduct := &models.CreateProduct{}
	if err := c.BodyParser(newProduct); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	validate := validators.NewValidator()
	if err := validate.Struct(newProduct); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(models.ErrorResponse{
			Message: "invalid input found",
			Errors:  validators.ValidatorErrors(err),
		})
	}

	productRepo := repository.NewProductRepo(database.GetDB())
	productId, err := productRepo.Create(newProduct)
	if err != nil {
		if database.DetectNotFoundContrainError(err) {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "invalid category",
			})
		}

		if database.DetectDuplicateError(err) {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "record already exists",
			})
		}
		fmt.Println("Error creating product:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "some thing bad happended",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": productId,
	})
}

// @UpdateProduct() godoc
// @Summary update product
// @Tags Product
// @Param id path string true "id product update"
// @Param todo body models.UpdateProduct true "product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/{id} [Put]
// @Security Bearer
func UpdateProduct(c *fiber.Ctx) error {
	token, ok := c.Locals("user").(*jwt.Token)
	if !ok {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(models.ErrorResponse{
			Message: "can not parse token",
		})
	}

	if !middlewares.GetAdminFromToken(token) {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Message: "you don't have permission",
		})
	}

	updateProduct := &models.UpdateProduct{}
	if err := c.BodyParser(updateProduct); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}
	updateProduct.ID = c.Params("id")

	validate := validators.NewValidator()
	if err := validate.Struct(updateProduct); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(models.ErrorResponse{
			Message: "invalid input found",
			Errors:  validators.ValidatorErrors(err),
		})
	}

	productRepo := repository.NewProductRepo(database.GetDB())
	if err := productRepo.UpdateById(updateProduct); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	return c.SendStatus(fiber.StatusOK)
}

// @DeleteProduct() godoc
// @Summary delete product by id
// @Tags Product
// @Param id path string true "id product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/{id} [delete]
// @Security Bearer
func DeleteProduct(c *fiber.Ctx) error {
	token, ok := c.Locals("user").(*jwt.Token)
	if !ok {
		return c.Status(fiber.ErrInternalServerError.Code).JSON(models.ErrorResponse{
			Message: "can not parse token",
		})
	}

	if !middlewares.GetAdminFromToken(token) {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Message: "you don't have permission",
		})
	}

	id := c.Params("id")
	uuid, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid id",
		})
	}

	productRepo := repository.NewProductRepo(database.GetDB())

	if _, err := productRepo.FindById(uuid); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	if err := productRepo.Delete(uuid); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	return c.SendStatus(fiber.StatusOK)
}

// @GetProducts() godoc
// @Summary query get "published" products
// @Description "field" not working on swagger you can read models.ProductQueryField for fields query
// @Description sort value can only asc or desc
// @Tags Product
// @Param queries query models.ProductQuery false "default: limit = 10"
// @Param fields query string false "fields query is json" example(field={"name":"hello"})
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/ [Get]
func GetProducts(c *fiber.Ctx) error {
	query := &models.ProductQuery{
		BaseQuery: *models.DefaultQuery(),
	}

	err := c.QueryParser(query)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	fmt.Printf("Parsed query: %+v\n", query)

	productRepo := repository.NewProductRepo(database.GetDB())
	products, err := productRepo.All(*query)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	nextPage := query.HaveNextPage(len(products))
	if nextPage {
		products = products[:len(products)-1]
	}

	return c.JSON(models.BasePaginationResponse{
		Items:    products,
		Page:     query.GetPageNumber(),
		PageSize: len(products),
		Next:     nextPage,
		Prev:     !query.IsFirstPage(),
	})
}

// @GetProductById() godoc
// @Summary getproduct by id
// @Tags Product
// @Param id path string true "id"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,404,500 {object} models.ErrorResponse "Error"
// @Router /product/{id} [Get]
func GetProductById(c *fiber.Ctx) error {
	id := c.Params("id")
	uuid, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	productRepo := repository.NewProductRepo(database.GetDB())
	product, err := productRepo.FindById(uuid)
	if err != nil && err != models.ErrNotFound {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "something bad happend :(",
		})
	}

	if product == nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(models.BasePaginationResponse{
		Items:    product,
		Page:     1,
		PageSize: 1,
		Next:     false,
		Prev:     false,
	})
}

// @UpdateDefaultVariant() godoc
// @Summary update default variant of product (deprecated) only use for testing
// @Description sort value can only asc or desc
// @Tags Product
// @Param id path string true "id"
// @Param todo body models.UpdateDefaultVariant true "New product"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/{id}/variant [Put]
// @Security Bearer
func UpdateDefaultVariant(c *fiber.Ctx) error {
	id := c.Params("id")
	uuid, err := uuid.Parse(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	updateRequest := &models.UpdateDefaultVariant{}
	if err := c.BodyParser(updateRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: err.Error(),
		})
	}

	updateRequest.ProductId = uuid
	validator := validators.NewValidator()
	if err := validator.Struct(updateRequest); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(models.ErrorResponse{
			Message: "invalid input found",
			Errors:  validators.ValidatorErrors(err),
		})
	}

	variantRepo := repository.NewVariantRepo(database.GetDB())
	if err := variantRepo.UpdateDefaultVariant(updateRequest); err != nil {
		if database.DetectDuplicateError(err) {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "record already exists",
			})
		}

		if database.DetectNotFoundContrainError(err) {
			return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
				Message: "invalid product",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Message: "some thing bad happended",
		})

	}

	return c.SendStatus(fiber.StatusCreated)
}

// @GetAllProducts() godoc
// @Summary query get all products
// @Description "field" not working on swagger you can read models.ProductQueryField for fields query
// @Description sort value can only asc or desc
// @Tags Product
// @Param queries query models.ProductQuery false "default: limit = 10"
// @Param fields query string false "fields query is json" example(field={"name":"hello"})
// @Accept json
// @Produce json
// @Success 200
// @Failure 400,403,404,500 {object} models.ErrorResponse "Error"
// @Router /product/all/ [Get]
// @Security Bearer
func GetAllProducts(c *fiber.Ctx) error {
	query := &models.ProductQuery{
		BaseQuery: *models.DefaultQuery(),
	}

	err := c.QueryParser(query)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "invalid input found",
		})
	}

	productRepo := repository.NewProductRepo(database.GetDB())
	products, err := productRepo.GetAllProducts(query)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Message: "record not found",
		})
	}

	nextPage := query.HaveNextPage(len(products))
	if nextPage {
		products = products[:len(products)-1]
	}

	return c.JSON(models.BasePaginationResponse{
		Items:    products,
		Page:     query.GetPageNumber(),
		PageSize: len(products),
		Next:     nextPage,
		Prev:     !query.IsFirstPage(),
	})
}
