# FastAPI + React Social Media Platform

A modern, full-stack social media application built with FastAPI, React, TypeScript, and PostgreSQL. This project demonstrates best practices in web development, including JWT authentication, RESTful API design, and containerization with Docker.

## Features

- **User Authentication**: Secure JWT-based authentication with FastAPI-Users
- **Post Management**: Create, read, and delete posts with image/video support
- **Media Storage**: Integration with ImageKit for optimized media delivery
- **Responsive Design**: Beautiful UI built with React and Tailwind CSS
- **Real-time Updates**: Dynamic feed with post interactions
- **Protected Routes**: Route guards for authenticated content
- **Dockerized**: Complete containerization for easy deployment

## Tech Stack

### Backend

- **FastAPI**: Modern Python web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Relational database
- **FastAPI-Users**: Ready-to-use authentication solution
- **Pydantic**: Data validation using Python type annotations
- **ImageKit**: Media management and optimization
- **Uvicorn**: ASGI server implementation

### Frontend

- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Next-generation frontend tooling
- **React Router DOM**: Declarative routing for React
- **Axios**: Promise-based HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: State management for authentication

### DevOps

- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Web server for serving React app

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.13+ (for local development)
- ImageKit account (for media storage)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JACS002/InstaFeed
```

### 2. Set up environment variables

Create a `.env` file in the root directory:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=fastapi_db
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://your_user:your_password@postgres:5432/fastapi_db
SECRET=your_secret_key_here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432

### 4. Local Development (Optional)

#### Backend

```bash
cd backend
pip install -e .
uvicorn app.app:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
📦 Intro FastApi/
├── 📁 backend/                 # FastAPI Backend
│   ├── 📁 app/
│   │   ├── app.py             # Main FastAPI application
│   │   ├── db.py              # Database models (SQLAlchemy)
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── users.py           # User authentication
│   │   └── images.py          # ImageKit service
│   ├── dockerfile
│   └── pyproject.toml
│
├── 📁 frontend/               # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 api/           # API services
│   │   ├── 📁 auth/          # Authentication
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 context/       # React Context
│   │   ├── 📁 pages/         # Page components
│   │   ├── App.tsx           # Main component & routing
│   │   └── main.tsx          # Entry point
│   ├── dockerfile
│   └── package.json
│
└── docker-compose.yml         # Docker orchestration
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/jwt/login` - User login
- `POST /auth/jwt/logout` - User logout

### Posts

- `POST /posts` - Create a new post (authenticated)
- `GET /posts` - Get all posts feed
- `DELETE /posts/{post_id}` - Delete a post (authenticated)

### Users

- `GET /users/me` - Get current user information
- `PATCH /users/me` - Update user information

## Features in Detail

### Authentication System

- JWT token-based authentication
- Secure password hashing
- Protected routes on both frontend and backend
- Automatic token refresh
- Session persistence with localStorage

### Post Management

- Upload images and videos via ImageKit
- Rich text descriptions
- User attribution
- Timestamp tracking
- Delete own posts functionality

### Responsive UI

- Mobile-first design
- Tailwind CSS utility classes
- Modern card-based layout
- Interactive components
- Loading states and error handling

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookie support
- CORS configuration
- Protected API endpoints
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy ORM

## Deployment

The application is containerized and ready for deployment to:

- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku
- Or any Docker-compatible hosting

## Author

**Joel Cuascota**

- Portfolio: www.jacs.dev

---

⭐ If you found this project helpful, please consider giving it a star!
