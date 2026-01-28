# MiKasa System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           User Browser                               │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                │ HTTPS
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                    Frontend (Vercel)                                 │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  React + TypeScript + Material-UI                          │    │
│  │  - Landing Page                                             │    │
│  │  - Search Page                                              │    │
│  │  - Profile Page                                             │    │
│  │  - About Us Page                                            │    │
│  └────────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                │ REST API (HTTPS)
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│              Backend API (DigitalOcean)                              │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Go Web Server (Port 9991)                                  │    │
│  │  - Authentication Handler                                   │    │
│  │  - Search Handler                                           │    │
│  │  - Property Filter Handler                                  │    │
│  └────┬─────────────────────────────────┬─────────────────────┘    │
│       │                                  │                           │
│       │                                  │                           │
│  ┌────▼──────────────────┐         ┌────▼──────────────────┐       │
│  │   PostgreSQL DB       │         │   Elasticsearch        │       │
│  │   - User Data         │         │   - Property Search    │       │
│  │   - Property Data     │         │   - Fast Indexing      │       │
│  └───────────────────────┘         └────────────────────────┘       │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ API Integration
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                    External Services                                 │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Auth0 - Authentication & Authorization                     │    │
│  └────────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  restb.ai - Property Image Analysis & Data                  │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Authentication**: Auth0 React SDK
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: React Spring, React Transition Group
- **Deployment**: Vercel

### Backend
- **Language**: Go 1.20
- **Web Framework**: Native Go net/http
- **Database**: PostgreSQL (via lib/pq)
- **Search Engine**: Elasticsearch v8
- **Environment Management**: godotenv
- **Deployment**: DigitalOcean with Nginx reverse proxy
- **Service Management**: systemd (goweb.service)

### External Services
- **Auth0**: User authentication and authorization
- **restb.ai**: Property image analysis and metadata

## Data Flow

1. **User Authentication**:
   - User accesses frontend → Auth0 login
   - Auth0 returns JWT token
   - Token sent with API requests to backend

2. **Property Search**:
   - User enters search criteria
   - Frontend sends request to Go backend
   - Backend queries Elasticsearch for matching properties
   - Backend enriches results with PostgreSQL data
   - Results returned to frontend and displayed

3. **Property Filtering**:
   - User applies filters (price, location, features)
   - Backend uses restb.ai data for intelligent matching
   - Elasticsearch performs fast full-text search
   - PostgreSQL provides relational data

## Deployment Architecture

### Frontend (Vercel)
- Automatic deployments from GitHub
- CDN distribution globally
- Custom domain: mikasa-hackupc.vercel.app

### Backend (DigitalOcean)
- Ubuntu 22.04 VM
- Nginx reverse proxy (SSL termination)
- Let's Encrypt SSL certificates
- systemd service for Go application
- PostgreSQL and Elasticsearch running on same VM

## Security Features

- HTTPS/TLS encryption on all connections
- JWT-based authentication via Auth0
- CORS configured for frontend domain
- Environment variables for sensitive data
- Database connection pooling
- Input validation and sanitization
