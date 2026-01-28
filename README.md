<div align="center">

# 🏠 MiKasa - Your Perfect Home Finder

### *Find your dream home with AI-powered property search and recommendations*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.20+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-8.7.0-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)](https://www.elastic.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

[Live Demo](#) • [Report Bug](https://github.com/ACMCMC/hackupc_2023/issues) • [Request Feature](https://github.com/ACMCMC/hackupc_2023/issues)

</div>

---

## 📖 About The Project

MiKasa is an intelligent home search platform that helps users find their perfect home by leveraging AI-powered image recognition and advanced search capabilities. Built during **HackUPC 2023**, this application uses data from `restb.ai` to filter and recommend properties based on user preferences, creating a personalized home-buying experience.

### ✨ Key Features

- 🔍 **Smart Search**: Advanced property filtering with Elasticsearch
- 🤖 **AI-Powered Recommendations**: Intelligent property matching using restb.ai
- 🔐 **Secure Authentication**: Auth0 integration for user management
- 📱 **Responsive Design**: Beautiful UI built with Material-UI
- ⚡ **Fast Performance**: Real-time search with optimized backend
- 🎨 **Image Recognition**: Automated property image analysis

---

## 🎥 Demo

> **Note:** Add a GIF or video demonstration of your application here. You can use tools like [LICEcap](https://www.cockos.com/licecap/) or [ScreenToGif](https://www.screentogif.com/) to create one.

### 📸 Screenshots

<div align="center">
  <img src="./frontend/src/static/images/LandingPage2.jpg" alt="Landing Page" width="45%">
  <img src="./frontend/src/static/images/AboutUs.jpg" alt="About Us" width="45%">
</div>

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │◄────────┤   Go Backend     │◄────────┤  Elasticsearch  │
│   (TypeScript)  │  HTTP   │   (REST API)     │  Query  │    Cluster      │
│                 │         │                  │         │                 │
└────────┬────────┘         └────────┬─────────┘         └─────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│                 │         │                  │
│     Auth0       │         │   restb.ai API   │
│  Authentication │         │  Image Analysis  │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
```

### Tech Stack

#### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **UI Library**: Material-UI (MUI) 5.13.0
- **Authentication**: Auth0 React SDK
- **Routing**: React Router DOM 6.11.1
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)

#### Backend
- **Language**: Go 1.20+
- **Search Engine**: Elasticsearch 8.7.0
- **Database**: PostgreSQL (via lib/pq)
- **Environment Management**: godotenv

#### DevOps & Tools
- **Version Control**: Git & GitHub
- **Package Management**: npm (Frontend), Go modules (Backend)
- **Deployment**: Vercel (Frontend), Custom infrastructure (Backend)
- **API Integration**: restb.ai for image analysis

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Go** (v1.20 or higher) - [Download](https://golang.org/dl/)
- **Elasticsearch** (v8.7.0 or higher) - [Download](https://www.elastic.co/downloads/elasticsearch)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/ACMCMC/hackupc_2023.git
cd hackupc_2023
```

#### 2. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory with your Auth0 credentials:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-auth0-audience
REACT_APP_API_URL=http://localhost:9991
```

#### 3. Setup Backend

```bash
cd ../backend
go mod download
```

Create a `.env` file in the `backend` directory:

```env
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your-password
DATABASE_URL=postgresql://user:password@localhost:5432/mikasa
RESTB_API_KEY=your-restb-api-key
PORT=9991
```

#### 4. Start Elasticsearch

Follow the [Elasticsearch installation guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) to start your Elasticsearch instance.

---

## 💻 Usage

### Running the Development Environment

#### Start the Backend Server

```bash
cd backend
go run main.go
```

The backend API will be available at `http://localhost:9991`

#### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

#### Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

#### Backend

```bash
cd backend
go build -o mikasa-server main.go
./mikasa-server
```

---

## 📁 Project Structure

```
hackupc_2023/
├── frontend/                # React TypeScript frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   ├── models/         # TypeScript types/interfaces
│   │   └── static/         # Images and assets
│   └── package.json
├── backend/                # Go backend server
│   ├── src/               # Go source files
│   │   ├── es.go          # Elasticsearch integration
│   │   ├── hf.go          # Helper functions
│   │   ├── autocomplete.go # Search autocomplete
│   │   └── aggregate.go   # Data aggregation
│   ├── main.go            # Entry point
│   └── go.mod
├── infra/                 # Infrastructure configuration
├── tests/                 # Test files
├── .gitignore
├── LICENSE
└── README.md
```

---

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

---

## 👥 Team - JAAZ @ HackUPC 2023

- [@JoachimStanislaus](https://github.com/JoachimStanislaus)
- [@AOrps](https://github.com/AOrps)
- [@acmcmc](https://github.com/acmcmc)
- [@ZacharyB1](https://github.com/ZacharyB1)

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 📧 Contact

Project Link: [https://github.com/ACMCMC/hackupc_2023](https://github.com/ACMCMC/hackupc_2023)

---

## 🙏 Acknowledgments

- [HackUPC 2023](https://hackupc.com/) for hosting the hackathon
- [restb.ai](https://restb.ai/) for providing AI-powered image recognition
- [Auth0](https://auth0.com/) for authentication services
- [Material-UI](https://mui.com/) for the beautiful component library
- [Elasticsearch](https://www.elastic.co/) for powerful search capabilities

---

<div align="center">
  Made with ❤️ by JAAZ Team at HackUPC 2023
</div>
