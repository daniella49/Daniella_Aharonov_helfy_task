# Task Manager Application

A full-stack Task Manager application built with:

- React frontend
- Express.js + Node.js backend
- In-memory data storage (no database)

The application allows users to create, view, update, delete, and manage tasks with priority levels, filtering, searching, sorting, and an infinite carousel display.

---

# Project Structure
task-manager/
│
├── backend/
│ ├── package.json
│ ├── package-lock.json
│ ├── node_modules
│ ├── server.js
│ ├── routes/
│ └── middleware/
│
├── frontend/
│ ├── package.json
│ ├── package-lock.json
│ ├── node_modules
│ ├── public/
│ └── src/
│ ├── components/
│ ├── services/
│ ├── styles/
│ └── App.js
│
├── .gitignore
└── README.md


---

# Setup and Installation

## Prerequisites

Make sure you have installed:

- Node.js
- npm

Check versions:

```bash
node -v
npm -v


## Backend Setup
1. cd backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm start (runs on port 3000)

## API Endpoints
- GET /api/tasks 
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

### Time Spent
Express setup and REST API - 1 hour and a half
React frontend structure and components - 1 hour
Infinite carousel implementation - 25 minutes
Styling and responsive design-	40 minutes
Testing, debugging, and extra features - 15 minutes
