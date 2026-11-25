# LostLink – University Lost and Found Management System

## 1. Project Overview

LostLink is a web-based University Lost and Found Management System developed to provide a centralized platform for reporting, searching and managing lost and found belongings.

The system allows users to report lost or found items, browse reported items, search and filter listings, and contact the individuals who reported them.

## 2. Problem Statement

LostLink provides a centralized platform where university community members can publish lost and found item reports.

Instead of relying on disconnected communication channels, users can browse available reports, find relevant items, and contact the individuals who reported them.

The application follows a MERN-based architecture, using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage.

## 3. Main Features

### User Management
- User registration and login.
- Secure password hashing.
- JWT-based authentication.

### Item Management
- Report lost and found items.
- Browse all reported items.
- View individual item details.
- Edit personal item reports.
- Delete personal item reports.

### Search, Filter and Sort
- Search reports by item name, location, and description.
- Filter items by status (Lost or Found).
- Filter by category.
- Filter by location and date.
- Sort reports by date and item name.

### Contact Management
- Send contact requests to item reporters.
- View received contact requests.
- Prevent duplicate pending contact requests.
- Prevent users from sending contact requests for their own items.

### Validation and Error Handling
- Client-side and server-side validation.
- Input validation and error messages.
- Authentication and authorization checks.
- Ownership verification when editing or deleting reports.

## 4. Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- React Router
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- CORS
- dotenv

### Database
- MongoDB

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- MongoDB Atlas

### Architecture Diagram

![Architecture](Diagrams/System%20Architecture.png)


## 5. Project Structure

```text
LostLink/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 6. Database Design

LostLink uses MongoDB with three main collections:

- **User:** Stores registered user information.
- **Item:** Stores lost and found item reports.
- **ContactRequest:** Stores contact requests between users regarding reported items.

The collections are connected using MongoDB ObjectId references.

### ER Diagram

![ER Diagram](Diagrams/ER%20DIAGRAM.jpeg)

## 7. Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB database
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/sithmi200309/LostLink.git
cd LostLink
```

### Step 2: Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory using `.env.example` as a reference.

Configure the following environment variables:

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Step 3: Start the backend server

```bash
npm run dev
```

The backend API runs at:

http://localhost:5000

### Step 4: Set up the frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

### Step 5: Start the frontend

```bash
npm run dev
```

The frontend runs at:

http://localhost:5173

## 8. API Endpoints

LostLink provides RESTful API endpoints for authentication, item management and contact requests.

### Authentication Routes

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Authenticate a user |

### Item Routes

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| GET | `/api/items` | Public | Retrieve all item reports |
| GET | `/api/items/my-reports` | Required | Retrieve reports belonging to the logged-in user |
| GET | `/api/items/:id` | Public | Retrieve an individual item |
| POST | `/api/items` | Required | Create a new item report |
| PUT | `/api/items/:id` | Required | Update an existing item report |
| DELETE | `/api/items/:id` | Required | Delete an item report |

### Contact Request Routes

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/api/contact` | Required | Send a contact request |
| GET | `/api/contact/received` | Required | Retrieve contact requests received by the logged-in user |

**Note:** Protected endpoints require a valid JWT access token in the HTTP Authorization header using the Bearer token format.


