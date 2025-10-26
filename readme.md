# Employee Details CRUD - Fullstack App
A simple fullstack CRUD application for managing employee details using React (Vite) on the frontend, Express on the backend, and PostgreSQL as the database.
- Tutorial referenced: https://youtu.be/mk5EIPu21y0 from [JavaScript Unleashed](https://www.youtube.com/@JavaScriptUnleashed)
- [.env](backend/.env) file has been pushed with intent for educational purposes

## Tech stack
- Frontend: React, Vite
  - Project entry: [frontend/src/main.jsx](frontend/src/main.jsx)
  - App root: [frontend/src/App.jsx](frontend/src/App.jsx)
  - Example UI component: [frontend/src/components/ui/EmployeeTable.jsx](frontend/src/components/ui/EmployeeTable.jsx)
  - Global constants: [frontend/constants/global-variables.js](frontend/constants/global-variables.js)
  - Client utilities: [frontend/utils/queryClient.js](frontend/utils/queryClient.js)
- Backend: Node.js, Express
  - Server entry: [backend/index.js](backend/index.js)
  - Employee routes: [backend/routes/employee.js](backend/routes/employee.js)
  - Employee controller: [backend/controllers/employee.js](backend/controllers/employee.js)
  - DB connection: [backend/utils/connectToDB.js](backend/utils/connectToDB.js)
  - SQL queries: [backend/utils/sqlQueries.js](backend/utils/sqlQueries.js)
  - Error handling: [backend/utils/error.js](backend/utils/error.js)
  - Environment variables: [backend/.env](backend/.env)
- Database: PostgreSQL

## Repo structure (key files)
- [frontend/](frontend)
  - [frontend/package.json](frontend/package.json)
  - [frontend/index.html](frontend/index.html)
  - [frontend/src/App.jsx](frontend/src/App.jsx)
  - [frontend/src/main.jsx](frontend/src/main.jsx)
  - [frontend/src/components/ui/EmployeeTable.jsx](frontend/src/components/ui/EmployeeTable.jsx)
  - [frontend/constants/global-variables.js](frontend/constants/global-variables.js)
  - [frontend/utils/queryClient.js](frontend/utils/queryClient.js)
- [backend/](backend)
  - [backend/package.json](backend/package.json)
  - [backend/index.js](backend/index.js)
  - [backend/controllers/employee.js](backend/controllers/employee.js)
  - [backend/routes/employee.js](backend/routes/employee.js)
  - [backend/utils/connectToDB.js](backend/utils/connectToDB.js)
  - [backend/utils/sqlQueries.js](backend/utils/sqlQueries.js)
  - [backend/utils/error.js](backend/utils/error.js)
  - [backend/.env](backend/.env)

## Features
- Create, read, update, delete employee records
- Frontend UI with table and form components
- Backend REST API for employees
- PostgreSQL integration with centralized SQL queries
- Simple error handling middleware

## Prerequisites
- Node.js (16+ recommended)
- npm
- PostgreSQL (running locally or remote)

## Setup
1. Clone the repository
2. Backend setup
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
  - Configure environment variables in [backend/.env](backend/.env). At minimum:
    - Database connection string parameters (host, port, user, password, database)
    - Any port configuration used by [backend/index.js](backend/index.js)
   - Start the backend server (common script):
     ```bash
     npm run dev
     ```
    - Relevant files:
      - Server entry: [backend/index.js](backend/index.js)
      - DB connect helper: [backend/utils/connectToDB.js](backend/utils/connectToDB.js)
      - SQL definitions: [backend/utils/sqlQueries.js](backend/utils/sqlQueries.js)
      - Routes & controllers: [backend/routes/employee.js](backend/routes/employee.js), [backend/controllers/employee.js](backend/controllers/employee.js)
3. Frontend setup
   - Open a new terminal and navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend dev server:
     ```bash
     npm run dev
     ```
   - Relevant files:
     - App bootstrap: [frontend/src/main.jsx](frontend/src/main.jsx)
     - App component: [frontend/src/App.jsx](frontend/src/App.jsx)
     - Components: [frontend/src/components/ui/EmployeeTable.jsx](frontend/src/components/ui/EmployeeTable.jsx)
     - Global constants: [frontend/constants/global-variables.js](frontend/constants/global-variables.js)

## Database
- Create a PostgreSQL database and user (if needed). Example psql commands:
  - List databases: `\l`
  - List tables in current DB: `\dt`
- The SQL statements used by the app are located in [backend/utils/sqlQueries.js](backend/utils/sqlQueries.js). Use them as a reference to create the employees table and any seed data

## API Endpoints
- The backend routes are defined in [backend/routes/employee.js](backend/routes/employee.js). The controller logic lives in [backend/controllers/employee.js](backend/controllers/employee.js)
- Typical endpoints (examples; check the route file for exact paths):
  - GET /employees - list employees
  - GET /employees/:id - get an employee by id
  - POST /employees - create employee
  - PUT /employees/:id - update employee
  - DELETE /employees/:id - delete employee

## Error handling
- Centralized error helper/middleware: [backend/utils/error.js](backend/utils/error.js)

## Development tips
- Use the log output from the backend (backend/index.js) and the browser console/front-end dev server to troubleshoot issues
- If database queries fail, inspect [sqlQueries.js](backend/utils/sqlQueries.js) and confirm table/schema match expectations

## Deployment
- Build the frontend for production with the Vite build step (`npm run build` in frontend)
- Deploy backend to any Node-compatible hosting and configure environment variables used by [backend/index.js](backend/index.js)
- Ensure the deployed backend can reach the PostgreSQL instance securely
