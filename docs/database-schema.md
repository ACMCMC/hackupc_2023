# Database Schema

## Overview

Mikasa uses PostgreSQL as its primary database for caching AI-generated responses and search results. This document describes the database schema and relationships.

## Entity Relationship Diagram

```
┌─────────────────────────────────────┐
│           Cache_DB                  │
├─────────────────────────────────────┤
│ PK | id          : SERIAL           │
│    | resource    : VARCHAR(255)     │
│    | query       : TEXT             │
│    | result      : TEXT             │
│    | created_at  : TIMESTAMP        │
└─────────────────────────────────────┘
```

## Tables

### Cache_DB

The `Cache_DB` table stores cached results from AI API calls to reduce latency and API costs.

**Fields:**

- `id` (PRIMARY KEY, SERIAL)
  - Auto-incrementing unique identifier for each cache entry
  - Type: INTEGER
  - Constraints: PRIMARY KEY, AUTO INCREMENT

- `resource` (VARCHAR(255))
  - Identifies the API endpoint or resource type being cached
  - Examples: "getCompletion", "getAppliances", "getReview"
  - Type: VARCHAR(255)
  - Constraints: None

- `query` (TEXT)
  - The input query or parameters sent to the API
  - Stored as text to accommodate variable-length inputs
  - Type: TEXT
  - Constraints: None

- `result` (TEXT)
  - The cached response from the AI API
  - Stored as text (often JSON-formatted)
  - Type: TEXT
  - Constraints: None

- `created_at` (TIMESTAMP)
  - Timestamp when the cache entry was created
  - Used for cache invalidation and analytics
  - Type: TIMESTAMP
  - Default: CURRENT_TIMESTAMP
  - Constraints: NOT NULL, DEFAULT CURRENT_TIMESTAMP

## Indexes

Currently, the table does not have additional indexes beyond the primary key. Consider adding the following indexes for better performance:

```sql
-- Index for looking up cached queries by resource and query
CREATE INDEX idx_cache_resource_query ON "Cache_DB" (resource, query);

-- Index for cache invalidation based on age
CREATE INDEX idx_cache_created_at ON "Cache_DB" (created_at);
```

## Sample Queries

### Insert a new cache entry

```sql
INSERT INTO "Cache_DB" (resource, query, result)
VALUES ('getCompletion', 'kitchen', '[{"generated_text": "cook"}]');
```

### Retrieve cached result

```sql
SELECT result FROM "Cache_DB"
WHERE resource = 'getCompletion' AND query = 'kitchen'
ORDER BY created_at DESC
LIMIT 1;
```

### Clean old cache entries (older than 30 days)

```sql
DELETE FROM "Cache_DB"
WHERE created_at < NOW() - INTERVAL '30 days';
```

## Connection Configuration

The database connection is configured using environment variables:

```
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
```

## Future Enhancements

Potential improvements to the database schema:

1. **User Table**: Store user preferences and search history
2. **Property Table**: Cache property information locally
3. **Search History**: Track user searches for analytics
4. **Favorites**: Allow users to save favorite properties
5. **Cache TTL**: Add expiration time for automatic cache invalidation

## Migration Scripts

### Initial Setup

```sql
-- Create the database
CREATE DATABASE mikasa_db;

-- Connect to the database
\c mikasa_db

-- Create the Cache_DB table
CREATE TABLE "Cache_DB" (
    id SERIAL PRIMARY KEY,
    resource VARCHAR(255),
    query TEXT,
    result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_cache_resource_query ON "Cache_DB" (resource, query);
CREATE INDEX idx_cache_created_at ON "Cache_DB" (created_at);

-- Grant permissions (replace with your actual database username)
GRANT ALL PRIVILEGES ON TABLE "Cache_DB" TO mikasa_user;
GRANT USAGE, SELECT ON SEQUENCE "Cache_DB_id_seq" TO mikasa_user;
```

## Backup and Maintenance

### Backup

```bash
# Full database backup
pg_dump -U your_db_username -d mikasa_db > backup.sql

# Table-specific backup
pg_dump -U your_db_username -d mikasa_db -t Cache_DB > cache_backup.sql
```

### Restore

```bash
# Restore from backup
psql -U your_db_username -d mikasa_db < backup.sql
```

### Maintenance

```sql
-- Analyze table for query optimization
ANALYZE "Cache_DB";

-- Vacuum to reclaim storage
VACUUM "Cache_DB";
```
