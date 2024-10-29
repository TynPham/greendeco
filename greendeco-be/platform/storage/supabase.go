package storage

import (
    "bytes"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "path/filepath"
    "sync"

    "github.com/google/uuid"
    "greendeco-be/pkg/configs"
)

type Storage interface {
    UploadFile(file *multipart.FileHeader) (string, error)
}

type SupabaseStorage struct {
    url    string
    key    string
    bucket string
    client *http.Client
}

var (
    instance Storage
    once     sync.Once
)

func GetStorage() (Storage, error) {
    var err error
    once.Do(func() {
        instance, err = newSupabaseStorage()
    })
    return instance, err
}

func newSupabaseStorage() (Storage, error) {
    cfg := configs.AppConfig().Supabase
    return &SupabaseStorage{
        url:    cfg.URL,
        key:    cfg.Key,
        bucket: cfg.Bucket,
        client: &http.Client{},
    }, nil
}

func (s *SupabaseStorage) UploadFile(file *multipart.FileHeader) (string, error) {
    fileContent, err := s.readFile(file)
    if err != nil {
        return "", fmt.Errorf("failed to read file: %w", err)
    }

    filename := s.generateFilename(file.Filename)

    if err := s.uploadToSupabase(fileContent, filename, file.Header.Get("Content-Type")); err != nil {
        return "", err
    }

    return s.generatePublicURL(filename), nil
}

func (s *SupabaseStorage) readFile(file *multipart.FileHeader) ([]byte, error) {
    src, err := file.Open()
    if err != nil {
        return nil, err
    }
    defer src.Close()

    return io.ReadAll(src)
}

func (s *SupabaseStorage) generateFilename(originalName string) string {
    ext := filepath.Ext(originalName)
    return fmt.Sprintf("%s%s", uuid.New().String(), ext)
}

func (s *SupabaseStorage) uploadToSupabase(content []byte, filename, contentType string) error {
    url := fmt.Sprintf("%s/storage/v1/object/%s/%s", s.url, s.bucket, filename)
    
    req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(content))
    if err != nil {
        return fmt.Errorf("failed to create request: %w", err)
    }

    req.Header.Set("Content-Type", contentType)
    req.Header.Set("Authorization", "Bearer "+s.key)

    resp, err := s.client.Do(req)
    if err != nil {
        return fmt.Errorf("failed to send request: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        return fmt.Errorf("upload failed with status %d: %s", resp.StatusCode, string(body))
    }

    return nil
}

func (s *SupabaseStorage) generatePublicURL(filename string) string {
    return fmt.Sprintf("%s/storage/v1/object/public/%s/%s",
        s.url,
        s.bucket,
        filename,
    )
}