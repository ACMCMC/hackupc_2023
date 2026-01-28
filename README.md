<div align="center">

<img src="./frontend/src/static/images/MikasaLogo.png" alt="Mikasa Logo" width="200"/>

# 🏠 Mikasa - AI-Powered Home Search

### *Find Your Perfect Home with Artificial Intelligence*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.20-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.13.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

**[Live Demo](#) | [Architecture](./docs/architecture.md) | [Report Bug](https://github.com/ACMCMC/hackupc_2023/issues)**

</div>

---

## 🎯 What is Mikasa?

**Mikasa** is an intelligent home search application that leverages AI and machine learning to help users find their ideal home based on their unique preferences and needs. Using advanced image analysis from restb.ai and natural language processing from HuggingFace, Mikasa understands what you're looking for and matches you with properties that fit your lifestyle.

### ✨ Key Features

- 🤖 **AI-Powered Search** - Natural language queries to find homes that match your needs
- 🏡 **Smart Filtering** - Intelligent filtering based on appliances, features, and amenities
- 📊 **Auto-Generated Reviews** - AI-generated property descriptions and insights
- 🔍 **Image Analysis** - Automatic detection of home features from photos
- 💾 **Smart Caching** - Lightning-fast repeat searches with intelligent caching
- 🔐 **Secure Authentication** - Auth0 integration for user management

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](./frontend/src/static/images/LandingPage.jpg)

### Search Interface
![Search Interface](./frontend/src/static/images/LandingPage2.jpg)

### About Us
![About Us](./frontend/src/static/images/AboutUs.jpg)

*Modern, responsive interface built with Material-UI*

</div>

---

## 🏗️ Architecture

Mikasa is built with a modern, scalable architecture:

```
┌─────────────┐      HTTPS       ┌─────────────┐      SQL      ┌──────────────┐
│   React     │ ◄─────────────► │  Go Backend │ ◄───────────► │  PostgreSQL  │
│  Frontend   │    REST API      │   (AWS EC2) │               │   (AWS RDS)  │
└─────────────┘                  └──────┬──────┘               └──────────────┘
                                        │
                                        │ AI APIs
                                        ▼
                        ┌──────────────────────────────┐
                        │  External AI Services        │
                        │  • HuggingFace (NLP)        │
                        │  • restb.ai (Image Analysis) │
                        │  • Elasticsearch (Search)    │
                        └──────────────────────────────┘
```

📖 **[View Detailed Architecture Documentation →](./docs/architecture.md)**

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2 with TypeScript
- **UI Library**: Material-UI (MUI) 5.13
- **State Management**: React Hooks
- **Authentication**: Auth0
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Language**: Go 1.20
- **Web Server**: Native Go net/http
- **Database**: PostgreSQL (AWS RDS)
- **Database Driver**: lib/pq
- **Environment**: AWS EC2
- **Reverse Proxy**: Nginx

### AI & Machine Learning
- **NLP**: HuggingFace API (FLAN-T5)
- **Image Analysis**: restb.ai API
- **Search Engine**: Elasticsearch

### DevOps & Infrastructure
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions
- **Frontend Hosting**: Vercel
- **Backend Hosting**: AWS EC2
- **Database**: AWS RDS
- **Monitoring**: Server logs

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Go** (v1.20 or higher)
- **PostgreSQL** (v12 or higher)
- **Python** (v3.8 or higher) - for data tools

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ACMCMC/hackupc_2023.git
   cd hackupc_2023
   ```

2. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up the Backend**
   ```bash
   cd ../backend
   go mod download
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
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

5. **Set up the Database**
   ```sql
   CREATE DATABASE your_db_name;
   
   CREATE TABLE "Cache_DB" (
       id SERIAL PRIMARY KEY,
       resource VARCHAR(255),
       query TEXT,
       result TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Running the Application

#### Development Mode

**Frontend** (from the `frontend` directory):
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

**Backend** (from the `backend` directory):
```bash
go run main.go
```
The API server will start at [http://localhost:9991](http://localhost:9991)

#### Production Build

**Frontend**:
```bash
npm run build
```

**Backend**:
```bash
go build -o mikasa-server
./mikasa-server
```

---

## 📁 Project Structure

```
hackupc_2023/
├── frontend/              # React TypeScript frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── Components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── api/          # API integration layer
│   │   ├── models/       # TypeScript interfaces
│   │   └── static/       # Images and static files
│   └── package.json
│
├── backend/              # Go backend server
│   ├── src/             # Go packages
│   ├── main.go          # Server entry point
│   ├── go.mod           # Go dependencies
│   └── requirements.txt # Python dependencies
│
├── infra/               # Infrastructure configuration
│   ├── nginx.conf       # Nginx configuration
│   ├── main.yml         # Deployment config
│   └── infra-pics/      # Infrastructure diagrams
│
├── docs/                # Documentation
│   └── architecture.md  # System architecture
│
├── tests/               # Test files
├── .github/             # GitHub Actions workflows
└── LICENSE              # MIT License
```

---

## 🧪 Testing

Run the test suite:

**Frontend**:
```bash
cd frontend
npm test
```

**Backend**:
```bash
cd backend
go test ./...
```

---

## 🤝 Team

**JAAZ Team - HackUPC 2023**

| Member | GitHub | Role |
|--------|--------|------|
| Joachim Stanislaus | [@JoachimStanislaus](https://github.com/JoachimStanislaus) | Full Stack Developer |
| Anthony Ortiz | [@AOrps](https://github.com/AOrps) | Backend & Infrastructure |
| Aldán Creo | [@acmcmc](https://github.com/acmcmc) | Frontend & UX |
| Zachary Boner | [@ZacharyB1](https://github.com/ZacharyB1) | Full Stack Developer |

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **HackUPC 2023** for the opportunity and inspiration
- **restb.ai** for real estate image analysis API
- **HuggingFace** for natural language processing capabilities
- **Auth0** for authentication services
- The open-source community for amazing tools and libraries

---

## 📮 Contact

Have questions or suggestions? Open an issue or reach out to the team!

**[Report Bug](https://github.com/ACMCMC/hackupc_2023/issues) | [Request Feature](https://github.com/ACMCMC/hackupc_2023/issues)**

---

<div align="center">

**Made with ❤️ by Team JAAZ at HackUPC 2023**

⭐ Star this repo if you found it helpful!

</div>
