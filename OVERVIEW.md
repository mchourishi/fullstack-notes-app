### Overview

#### This PR introduces a full-stack notes application with the following architecture:

- React frontend for user interface
- Node.js BFF (Backend for Frontend) for API gateway and request handling
- Python backend for core business logic
- MongoDB for data persistence

### Key Features

- User Authentication and Authorization
- Authenticated user can add notes, view existing notes and generate and add a random note(quote).
- Data Validation
- Error Handling and Logging
- Structured Code with modularity.

### Technical Implementation (Key Decisions)

#### Frontend (React)

- Responsive UI Design
- Material-UI components for consistent design
- Client Side Validation
- Error boundaries for graceful error handling.

### BFF (NodeJS)

- JWT authentication middleware.
- Request Validation

### Backend(Python)

- Uses FastAPI
- Pydantic models for data validation
- JWT token creation with expiry
- Secure password hashing with bcrypt before storing into database.
- OAuth2 based token authentication.
- Error handling.
- Interacts with MongoDB

### Testing

- Jest and React Testing Library for frontend (React)

### Security Measures

- Input Sanitization
- Secure Password Hashing
- JWT token management.

### Improvements that could be done

- API Rate Limiting.
- Input Sanitization.
- Auto refreshing token.

#

### Testing Instructions

- Install dependencies and run applications (follow SETUP.md)
- Copy .env.example values to .env for backend, frontend/client and frontend/server. (Change values if needed).
- From backend directory run `python backend.py`
- From frontend/server directory run `npm run dev`
- From frontend/client directory run `npm start`
- Access application at: `http://localhost:3000`
- To run tests from from frontend/client directory `npm test`
