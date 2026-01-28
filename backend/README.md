# Mikasa Backend

This is the Go backend server for Mikasa, providing REST API endpoints and AI integration.

## Tech Stack

- **Go** 1.20
- **PostgreSQL** database with lib/pq driver
- **HuggingFace API** for natural language processing
- **restb.ai API** for image analysis
- **Elasticsearch** for search functionality

## Project Structure

```
backend/
├── src/              # Go packages
│   ├── aggregate.go  # Integration logic
│   ├── es.go         # Elasticsearch queries
│   └── hf.go         # HuggingFace API integration
├── main.go           # Server entry point
├── go.mod            # Go dependencies
├── go.sum            # Dependency checksums
└── requirements.txt  # Python dependencies for tools
```

## API Endpoints

- `GET /` - Health check endpoint
- `POST /getAppliances` - AI-powered appliance detection
- `GET /getCompletion` - Text completion using AI
- `POST /getReview` - Generate property reviews
- `GET /getEs` - Search properties using Elasticsearch

## Environment Variables

Create a `.env` file in the backend directory (see `.env.example`):

```bash
# Database Configuration
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name

# API Keys
HF_ENDP=your_huggingface_endpoint
HF_ENDP_COMPL=your_huggingface_completion_endpoint
```

## Running the Server

### Development

```bash
# Install dependencies
go mod download

# Run the server
go run main.go
```

The server will start on `http://localhost:9991`

### Production

```bash
# Build the binary
go build -o mikasa-server

# Run the server
./mikasa-server
```

## Database Setup

The backend requires a PostgreSQL database with the following table:

```sql
CREATE TABLE "Cache_DB" (
    id SERIAL PRIMARY KEY,
    resource VARCHAR(255),
    query TEXT,
    result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

See [database-schema.md](../docs/database-schema.md) for full details.

**Note**: For comprehensive setup instructions including database initialization and environment configuration, refer to the [main README](../README.md) in the root directory.

## Testing

```bash
# Run all tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific package tests
go test ./src/...
```

## CORS Configuration

The server enables CORS for all origins by default. For production, configure specific allowed origins in the `enableCors` function.

## Learn More

- [Go Documentation](https://golang.org/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/)
