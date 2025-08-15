# Todo Backend API

A RESTful API built with Node.js, Express, Docker, and Prisma ORM for managing todos with user authentication. 

## 🚀 Features

- User registration and authentication with JWT
- CRUD operations for todos
- User-specific todo management
- PostgreSQL database with Prisma ORM
- Docker containerization
- Password hashing with bcrypt

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

## 🏃‍♂️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/jeffelin/todo_app_v1.git
cd backend_2
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/todoapp"
JWT_SECRET="your-super-secret-jwt-key-here"
```

### 3. Run with Docker (Recommended)
```bash
# Build and start all services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

### 4. Run Locally (Alternative)
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start PostgreSQL (ensure it's running on localhost:5432)
# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        Int     @id @default(autoincrement())
  username  String  @unique
  password  String
  todos     Todo[]
}
```

### Todo Model
```prisma
model Todo {
  id        Int     @id @default(autoincrement())
  task      String
  completed Boolean @default(false)
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (Protected Routes)
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword"}'
```

#### Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"task": "Complete the project"}'
```

## 🐳 Docker Configuration

The application uses Docker Compose with two services:
- **app**: Node.js application
- **postgres-db**: PostgreSQL database

### Services
- **App**: Runs on port 5000
- **Database**: PostgreSQL on port 5432

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npx prisma studio` - Open Prisma database browser
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client

### Project Structure
```
backend/
├── src/
│   ├── server.js          # Main application file
│   ├── prismaClient.js    # Prisma client configuration
│   └── routes/            # API routes
├── prisma/
│   └── schema.prisma      # Database schema
├── docker-compose.yaml    # Docker services configuration
├── Dockerfile            # Application container
├── package.json          # Dependencies and scripts
└── .env                  # Environment variables
```

Credits to and adapted from https://github.com/jamezmca/backend-full-course. 


