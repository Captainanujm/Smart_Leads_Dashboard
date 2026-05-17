# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with modern features, a professional UI, and clean architecture.

## Features

- **Authentication System**: JWT-based auth with HttpOnly cookies, bcrypt hashing, and role-based access control.
- **Leads Management**: Full CRUD operations for managing leads.
- **Advanced Filtering & Search**: Debounced search, multi-factor filtering (Status, Source), and sorting.
- **Pagination**: Backend-driven pagination for scalability.
- **CSV Export**: Export filtered data directly to a CSV file.
- **Role-Based Access Control**: Admins have full access; Sales users can only manage their assigned leads.
- **Dark Mode**: Built-in dark/light mode toggle with persistence.
- **Dockerized**: Easy setup and deployment via Docker Compose.

## Tech Stack

- **Frontend**: React (Vite), TypeScript, TailwindCSS v4, React Router, Axios
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB

## Quick Start (Docker)

The easiest way to run the project is using Docker.

1. Ensure Docker and Docker Compose are installed on your machine.
2. Clone the repository.
3. Run the following command from the root directory:

```bash
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api

## Manual Setup

If you prefer to run it without Docker:

### 1. Database Setup
Create a MongoDB database (e.g., MongoDB Atlas) and obtain the connection string.

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env # Edit the .env file with your MONGO_URI and JWT_SECRET
npm run build
npm start
```
*For development, use `npm run dev`.*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Default Accounts

To test Role-Based Access Control, register two different accounts or manipulate the database manually. By default, newly registered users are assigned the `sales` role. To test the `admin` role, you will need to manually change the role of a user in the MongoDB database to `admin`.

## API Documentation

See [API_DOCS.md](./API_DOCS.md) for detailed information on the available endpoints.
