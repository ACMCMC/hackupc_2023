<div align="center">

<img src="https://github.com/user-attachments/assets/b8c88fc3-f17f-4593-ab99-9944e826b592" alt="MiKasa Logo" width="300"/>

# MiKasa - Your Perfect Home Finder

**Find your dream home with AI-powered search and intelligent filtering**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.20-00ADD8?logo=go&logoColor=white)](https://golang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.0-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-8.7.1-005571?logo=elasticsearch&logoColor=white)](https://www.elastic.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*Built during HackUPC 2023 by Team JAAZ*

[Live Demo](#) • [Architecture](docs/ARCHITECTURE.md) • [Report Bug](https://github.com/ACMCMC/hackupc_2023/issues)

</div>

---

## 🏠 What is MiKasa?

MiKasa is an intelligent home search platform that revolutionizes how people find their perfect home. By leveraging AI-powered image analysis from **restb.ai**, we enable users to search and filter properties based on visual features, location preferences, and personalized criteria. Say goodbye to endless scrolling through irrelevant listings - MiKasa finds your ideal match! 🎯

## ✨ Key Features

- 🔐 **Secure Authentication** - Auth0 integration for seamless and secure login
- 🔍 **Intelligent Search** - Lightning-fast property search powered by Elasticsearch
- 🎨 **Visual Analysis** - AI-powered property image analysis using restb.ai
- 🎯 **Smart Filtering** - Filter by price, location, features, and visual preferences
- 📱 **Responsive Design** - Beautiful Material-UI interface that works on all devices
- ⚡ **Real-time Results** - Fast, accurate search results in milliseconds

## 🖼️ Screenshots

### Landing Page
![Landing Page](frontend/src/static/images/LandingPage2.jpg)

### Search Experience
*Search for your dream home with intelligent filters and AI-powered recommendations*

## 🏗️ Architecture

MiKasa follows a modern, scalable architecture with clear separation of concerns:

```
Frontend (React + TypeScript)  →  Backend API (Go)  →  Database (PostgreSQL + Elasticsearch)
     ↓                                   ↓                        ↓
  Vercel CDN                      DigitalOcean VM           Data Storage & Search
```

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Authentication**: Auth0 React SDK
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: React Spring

### Backend
- **Language**: Go 1.20
- **Database**: PostgreSQL
- **Search Engine**: Elasticsearch v8.7.1
- **Authentication**: Auth0
- **Deployment**: DigitalOcean with Nginx

### External Services
- **restb.ai** - Property image analysis and AI features
- **Auth0** - Authentication and user management

## 🚀 Getting Started

### Prerequisites

Before running MiKasa locally, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Go** (v1.20 or higher) - [Download](https://golang.org/dl/)
- **PostgreSQL** (v13 or higher) - [Download](https://www.postgresql.org/download/)
- **Elasticsearch** (v8.7 or higher) - [Download](https://www.elastic.co/downloads/elasticsearch)
- **Git** - [Download](https://git-scm.com/downloads)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/ACMCMC/hackupc_2023.git
cd hackupc_2023
```

#### 2. Set Up Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-auth0-audience
REACT_APP_API_URL=http://localhost:9991
```

#### 3. Set Up Backend

```bash
cd ../backend
go mod download
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgres://user:password@localhost:5432/mikasa?sslmode=disable
ELASTICSEARCH_URL=http://localhost:9200
RESTB_API_KEY=your-restb-api-key
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
PORT=9991
```

#### 4. Set Up Database

```bash
# Create PostgreSQL database
createdb mikasa

# Run migrations (if available)
psql mikasa < backend/data/schema.sql
```

#### 5. Start Elasticsearch

```bash
# Start Elasticsearch (adjust command based on your installation)
elasticsearch
```

### Running the Application

#### Start Backend Server

```bash
cd backend
go run main.go
```

The backend API will be available at `http://localhost:9991`

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

### Building for Production

#### Frontend

```bash
cd frontend
npm run build
```

The production build will be created in the `frontend/build` directory.

#### Backend

```bash
cd backend
go build -o mikasa-server main.go
./mikasa-server
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
go test ./...
```

## 📁 Project Structure

```
hackupc_2023/
├── frontend/              # React TypeScript frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── Components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── api/          # API client functions
│   │   ├── models/       # TypeScript interfaces
│   │   └── static/       # Images and static files
│   └── package.json
├── backend/              # Go backend server
│   ├── src/             # Source code packages
│   ├── data/            # Database schemas and seeds
│   ├── main.go          # Application entry point
│   └── go.mod
├── infra/               # Infrastructure configuration
│   ├── nginx.conf       # Nginx configuration
│   └── goweb.service    # systemd service file
├── docs/                # Documentation
│   └── ARCHITECTURE.md  # System architecture
├── tests/               # Integration tests
└── README.md
```

## 👥 Team JAAZ - HackUPC 2023

- [@JoachimStanislaus](https://github.com/JoachimStanislaus) - Frontend Development
- [@AOrps](https://github.com/AOrps) - Backend Development
- [@acmcmc](https://github.com/acmcmc) - Full Stack Development
- [@ZacharyB1](https://github.com/ZacharyB1) - Infrastructure & DevOps

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ACMCMC/hackupc_2023/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HackUPC 2023** - For hosting an amazing hackathon
- **restb.ai** - For providing powerful image analysis APIs
- **Auth0** - For authentication infrastructure
- All the open-source libraries that made this project possible

---

<div align="center">

**Made with ❤️ by Team JAAZ at HackUPC 2023**

⭐ Star this repo if you found it helpful!

</div>
