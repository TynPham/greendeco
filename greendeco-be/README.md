# GreenDeco Backend

GreenDeco is an E-commerce backend system built with Go, focusing on plant and garden decoration products.

## Tech Stack

- **Go** (1.21+)
- **GoFiber** - Fast and minimalist web framework
- **PostgreSQL/Supabase** - Database
- **GORM** - ORM
- **JWT** - Authentication
- **Swagger** - API Documentation
- **Air** - Hot Reload

## Features

- RESTful API
- JWT Authentication
- Role-based Authorization
- File Upload (Supabase Storage)
- Payment Integration (VNPay, PayPal)
- Email Service
- Swagger Documentation

## Prerequisites

- Go 1.21+
- PostgreSQL or Supabase account

## Project Structure

```
greendeco-be/
├── cmd/
│ └── server/ # Server setup and initialization
├── pkg/
│ ├── configs/ # Configuration management
│ ├── handlers/ # Request handlers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Data models
│ └── routes/ # Route definitions
├── platform/
│ └── database/ # Database connection
├── docs/ # Swagger documentation
├── .env # Environment variables
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TynPham/greendeco.git
cd greendeco-be
```

### 2. Install dependencies

```bash
go mod tidy
```

### 3. Set up environment variables

##### Copy .env.example to .env

```bash
cp .env.example .env
```

### 4. Run app

#### Migrate database when the first time running

##### - Uncomment the following line in cmd/server/server.go for the first time to migrate database and running the app

```go
// if err := database.GetDB().Migrate(); err != nil {
// 	log.Panic(err)
// }
```

##### If you already have a database, you can comment above command

#### Using docker

```bash
docker compose up
```

#### Using Local Database

1. Install PostgreSQL locally
2. Update .env with your database credentials
3. Run app

```bash
go run main.go
```

###### Run with hot reload

```bash
# Install Air
go install github.com/cosmtrek/air@latest

# Run with Air
air
```

## API Documentation

Swagger documentation is available at `http://localhost:8080/docs/index.html`
