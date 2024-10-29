package controller

import (
    "greendeco-be/app/models"
    "greendeco-be/platform/storage"
    "github.com/gofiber/fiber/v2"
)

// @PostMedia() godoc
// @Summary create new image return image
// @Tags Media
// @ID  image
// @Produce     json
// @Accept  multipart/form-data
// @Param image formData file true "upfile"
// @Success 200
// @Router /media/upload [post]
// @Security Bearer
func PostMedia(c *fiber.Ctx) error {
    file, err := c.FormFile("image")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
            Message: "invalid file",
            Errors:  err.Error(),
        })
    }

    stor, err := storage.GetStorage()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
            Message: "storage initialization failed",
            Errors:  err.Error(),
        })
    }

    url, err := stor.UploadFile(file)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
            Message: "file upload failed",
            Errors:  err.Error(),
        })
    }

    return c.SendString(url)
}