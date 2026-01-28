# MiKasa Architecture Documentation

## System Overview

MiKasa is a full-stack web application designed to help users find their ideal home using AI-powered search and recommendations. The system consists of a React frontend, Go backend, Elasticsearch search engine, and integrates with external services like Auth0 and restb.ai.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    React Frontend (TypeScript)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Landing     │  │   Search     │  │   Profile    │          │
│  │  Page        │  │   Page       │  │   Page       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐          │
│  │         Material-UI Components Layer              │          │
│  └──────────────────────────────────────────────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ REST API (HTTP/JSON)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Go Backend Server                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  HTTP        │  │  Search      │  │  Aggregation │          │
│  │  Handler     │  │  Logic       │  │  Engine      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐          │
│  │         Elasticsearch Client                      │          │
│  └──────────────────────────────────────────────────┘          │
└─────┬──────────────────┬──────────────────┬────────────────────┘
      │                  │                  │
      │                  │                  │
      ▼                  ▼                  ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────────┐
│             │  │             │  │                 │
│ Elasticsearch│  │ PostgreSQL  │  │   External APIs │
│   Cluster   │  │  Database   │  │                 │
│             │  │             │  │  - Auth0        │
│             │  │             │  │  - restb.ai     │
└─────────────┘  └─────────────┘  └─────────────────┘
```

## Component Details

### Frontend (React + TypeScript)

**Technology Stack:**
- React 18.2.0
- TypeScript 4.9.5
- Material-UI 5.13.0
- React Router DOM 6.11.1
- Axios for HTTP requests
- Auth0 React SDK

**Key Components:**
- **Pages**: LandingPage, SearchPage, Profile, AboutUs
- **Components**: Reusable UI components (LoginButton, LogoutButton, etc.)
- **API Layer**: Axios-based API client for backend communication
- **Authentication**: Auth0 integration for user management

**Responsibilities:**
- User interface rendering
- User input handling
- Authentication state management
- API communication with backend
- Routing and navigation

### Backend (Go)

**Technology Stack:**
- Go 1.20+
- Elasticsearch Go client 8.7.0
- PostgreSQL driver (lib/pq)
- godotenv for environment management

**Key Modules:**
- **main.go**: Entry point and HTTP server setup
- **es.go**: Elasticsearch operations and queries
- **autocomplete.go**: Search autocomplete functionality
- **aggregate.go**: Data aggregation and statistics
- **hf.go**: Helper functions and utilities

**Responsibilities:**
- RESTful API endpoints
- Business logic processing
- Elasticsearch query construction
- Database operations
- External API integration

### Data Layer

#### Elasticsearch
- **Purpose**: Primary search engine for property data
- **Version**: 8.7.0
- **Use Cases**:
  - Full-text search on property descriptions
  - Fuzzy matching for autocomplete
  - Geospatial queries for location-based search
  - Aggregations for filters and statistics

#### PostgreSQL
- **Purpose**: Relational data storage
- **Use Cases**:
  - User profile data
  - Saved searches and favorites
  - Transactional data

### External Services

#### Auth0
- **Purpose**: Authentication and authorization
- **Integration**: OAuth 2.0 / OpenID Connect
- **Features**:
  - User registration and login
  - Social authentication
  - JWT token management

#### restb.ai
- **Purpose**: AI-powered image analysis
- **Features**:
  - Property image recognition
  - Room detection and classification
  - Feature extraction from images

## Data Flow

### 1. User Search Flow

```
1. User enters search query in frontend
   └─> Frontend validates input
       └─> Sends HTTP POST to /api/search

2. Backend receives request
   └─> Validates and sanitizes input
       └─> Constructs Elasticsearch query
           └─> Executes search on Elasticsearch

3. Elasticsearch returns results
   └─> Backend processes and formats results
       └─> Sends JSON response to frontend

4. Frontend receives results
   └─> Renders property cards
       └─> Updates UI with search results
```

### 2. Authentication Flow

```
1. User clicks "Login" button
   └─> Redirects to Auth0 login page

2. User authenticates with Auth0
   └─> Auth0 validates credentials
       └─> Generates JWT token

3. Auth0 redirects back to app with token
   └─> Frontend stores token
       └─> Includes token in subsequent API requests

4. Backend validates JWT token
   └─> Extracts user information
       └─> Authorizes API access
```

### 3. Property Image Analysis Flow

```
1. Property images uploaded/detected
   └─> Backend sends images to restb.ai API

2. restb.ai analyzes images
   └─> Detects rooms, features, quality
       └─> Returns structured data

3. Backend receives analysis results
   └─> Indexes data in Elasticsearch
       └─> Stores metadata in PostgreSQL

4. Data available for search and filtering
```

## API Endpoints

### Backend REST API

```
GET  /api/search          - Search properties
POST /api/autocomplete    - Get search suggestions
GET  /api/property/:id    - Get property details
GET  /api/aggregate       - Get aggregated statistics
POST /api/favorite        - Save favorite property
GET  /api/favorites       - Get user's favorites
```

## Deployment Architecture

### Frontend Deployment (Vercel)
- Static site deployment
- CDN distribution
- Automatic HTTPS
- Environment variables for configuration

### Backend Deployment (Custom Infrastructure)
- VM-based deployment
- Nginx reverse proxy
- SSL/TLS termination
- Load balancing (if scaled)

### Database and Search Engine
- Elasticsearch cluster (managed or self-hosted)
- PostgreSQL instance
- Regular backups
- Monitoring and logging

## Security Considerations

1. **Authentication**: JWT tokens from Auth0
2. **Authorization**: Role-based access control
3. **API Security**: 
   - CORS configuration
   - Rate limiting
   - Input validation and sanitization
4. **Data Protection**:
   - HTTPS everywhere
   - Environment variables for secrets
   - Database encryption at rest
5. **Dependencies**: Regular security updates

## Performance Optimization

1. **Frontend**:
   - Code splitting with React.lazy
   - Image optimization and lazy loading
   - Caching strategies
   - Minification and bundling

2. **Backend**:
   - Connection pooling for database
   - Elasticsearch query optimization
   - Response caching
   - Concurrent request handling

3. **Search**:
   - Elasticsearch index optimization
   - Query result caching
   - Pagination for large result sets

## Monitoring and Observability

1. **Logging**:
   - Application logs (structured JSON)
   - Error tracking and alerts
   - Access logs

2. **Metrics**:
   - API response times
   - Search performance
   - User engagement metrics
   - System resource utilization

3. **Health Checks**:
   - Backend API health endpoint
   - Database connectivity checks
   - Elasticsearch cluster health

## Scalability Considerations

1. **Horizontal Scaling**:
   - Frontend: CDN edge locations
   - Backend: Multiple Go server instances
   - Elasticsearch: Cluster with multiple nodes

2. **Vertical Scaling**:
   - Increase server resources as needed
   - Optimize database queries
   - Cache frequently accessed data

3. **Database Scaling**:
   - Read replicas for PostgreSQL
   - Elasticsearch sharding for large datasets

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live property updates
2. **Machine Learning**: Personalized recommendations based on user behavior
3. **Mobile Apps**: Native iOS and Android applications
4. **Advanced Analytics**: User behavior tracking and insights
5. **Multi-language Support**: Internationalization (i18n)
6. **Property Comparison**: Side-by-side property comparison feature

## Technology Decisions and Rationale

### Why React?
- Large ecosystem and community
- Component-based architecture
- Excellent TypeScript support
- Rich library of UI components (Material-UI)

### Why Go for Backend?
- High performance and concurrency
- Simple deployment (single binary)
- Strong standard library
- Excellent for microservices

### Why Elasticsearch?
- Purpose-built for search
- Powerful full-text search capabilities
- Scalable and fast
- Rich query DSL and aggregations

### Why Auth0?
- Reduces authentication complexity
- Enterprise-grade security
- Social login integration
- Scalable and reliable

## Development Workflow

1. **Local Development**:
   - Frontend: `npm start` (port 3000)
   - Backend: `go run main.go` (port 9991)
   - Elasticsearch: Local instance (port 9200)

2. **Testing**:
   - Frontend: Jest and React Testing Library
   - Backend: Go testing framework
   - Integration tests for API endpoints

3. **CI/CD**:
   - Automated testing on pull requests
   - Deployment to staging environment
   - Production deployment after approval

## Conclusion

MiKasa's architecture is designed for scalability, maintainability, and performance. The separation of concerns between frontend, backend, and data layers allows for independent scaling and development. The use of modern technologies and best practices ensures the application can grow with user demands while maintaining high quality and security standards.
