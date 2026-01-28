# System Architecture

## Overview

Mikasa is a full-stack home search application that uses AI to help users find their ideal home based on their preferences and needs.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Vercel)                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              React + TypeScript + Material-UI              │ │
│  │                                                            │ │
│  │  Pages:                      Components:                  │ │
│  │  - Landing Page              - Search Filters             │ │
│  │  - Search Page               - House Cards                │ │
│  │  - Profile                   - Navigation                 │ │
│  │  - About Us                                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS/REST API
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                   Backend Server (AWS EC2)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Go HTTP Server                          │ │
│  │                                                            │ │
│  │  Endpoints:                                               │ │
│  │  - /getAppliances  - AI appliance detection               │ │
│  │  - /getCompletion  - Text completion                      │ │
│  │  - /getReview      - Generate house reviews               │ │
│  │  - /getEs          - Search houses                        │ │
│  └────────────┬──────────────────────────┬────────────────────┘ │
└───────────────┼──────────────────────────┼──────────────────────┘
                │                          │
                │                          │
    ┌───────────▼──────────┐   ┌──────────▼───────────┐
    │   PostgreSQL DB      │   │   External Services  │
    │   (AWS RDS)          │   │   - restb.ai API     │
    │                      │   │   - HuggingFace API  │
    │  Tables:             │   │   - Elasticsearch    │
    │  - Cache_DB          │   └──────────────────────┘
    │    (query caching)   │
    └──────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│  - HuggingFace API (AI text generation)                         │
│  - restb.ai (Real estate image analysis)                        │
│  - Auth0 (Authentication)                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Component Descriptions

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React hooks
- **Authentication**: Auth0
- **Routing**: React Router v6
- **Deployment**: Vercel with custom domain

### Backend (Go)
- **Language**: Go 1.20+
- **HTTP Server**: Native Go net/http
- **Port**: 9991
- **Database Driver**: lib/pq (PostgreSQL)
- **Environment**: AWS EC2
- **Reverse Proxy**: Nginx

### Database (PostgreSQL)
- **Service**: AWS RDS
- **Purpose**: Query caching for AI responses
- **Tables**: Cache_DB (stores resource, query, result)

### AI/ML Services
- **HuggingFace API**: Text generation and completion using FLAN-T5 model
- **restb.ai**: Real estate image analysis for appliance detection
- **Elasticsearch**: House data search and filtering

## Data Flow

1. **User Search Flow**:
   - User enters preferences on frontend
   - React app sends POST request to `/getAppliances`
   - Backend queries HuggingFace API for appliance matching
   - Results cached in PostgreSQL
   - Response sent back to frontend
   - UI updates with matching properties

2. **House Review Generation**:
   - Frontend sends house data to `/getReview`
   - Backend uses AI to generate descriptive review
   - Response cached for future requests
   - Generated review displayed to user

3. **Search and Filter**:
   - Frontend sends search terms to `/getEs`
   - Backend queries Elasticsearch index
   - Results filtered and returned
   - Frontend displays matching houses

## Security

- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- Auth0 integration for user authentication
- HTTPS for all external communication

## Infrastructure

- **Frontend**: Vercel deployment with automatic CI/CD
- **Backend**: AWS EC2 with Nginx reverse proxy
- **Database**: AWS RDS PostgreSQL
- **DNS**: Custom domain configuration
- **Monitoring**: Server logs and error tracking
