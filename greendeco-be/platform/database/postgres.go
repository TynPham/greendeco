package database

import (
	"fmt"
	"os"
	"strings"
	"sync"
	"time"

	"greendeco-be/pkg/configs"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/jmoiron/sqlx"
)

type DB struct {
	*sqlx.DB
}

var (
	defaultDB *DB
	once      sync.Once
)

// ConnectDB ensures only one database connection is created
func ConnectDB() error {
	var err error
	once.Do(func() {
		err = connectPostgresql()
	})
	return err
}

func connectPostgresql() error {
	cfg := configs.AppConfig()
	dns := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s prefer_simple_protocol=true", 
		cfg.Database.Host, 
		cfg.Database.User, 
		cfg.Database.Password, 
		cfg.Database.Name, 
		cfg.Database.Port, 
		cfg.Database.SSLMode,
	)

	db, err := sqlx.Connect("pgx", dns)
	if err != nil {
		return fmt.Errorf("error opening database: %w", err)
	}

	// Configure connection pool
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	db.SetConnMaxLifetime(time.Hour)

	// Test connection
	if err = db.Ping(); err != nil {
		db.Close()
		return fmt.Errorf("error connecting to the database: %w", err)
	}

	defaultDB = &DB{DB: db}
	return nil
}

func GetDB() *DB {
	return defaultDB
}

// CloseDB closes the database connection
func CloseDB() error {
	if defaultDB != nil && defaultDB.DB != nil {
		return defaultDB.Close()
	}
	return nil
}

func (db *DB) loadSQLFile(sqlFile string) error {
	file, err := os.ReadFile(sqlFile)
	if err != nil {
		return err
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	defer func() {
		tx.Rollback()
	}()

	for _, q := range strings.Split(string(file), ";") {
		q := strings.TrimSpace(q)
		if q == "" {
			continue
		}
		if _, err := tx.Exec(q); err != nil {
			return err
		}
	}
	return tx.Commit()
}

func (db *DB) Migrate() error {
	if err := db.loadSQLFile("migrator/migrations/1_initialize_schema.up.sql"); err != nil {
		println(err.Error())
		return err
	}

	return nil
}
