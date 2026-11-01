# Eventora – Event Management System

**You imagine it. We create it. They remember it.**

Eventora is a web-based Event Management System designed to help users explore event services and submit event booking inquiries through a simple and user-friendly interface.

## Features

- Responsive and user-friendly website.
- Event service information and presentation.
- Event booking inquiry form.
- Collects customer details and event requirements.
- Backend API for handling booking inquiries.
- MySQL database integration.
- View, update, and delete inquiry records.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

**Tools**
- Visual Studio Code
- Git and GitHub
- MySQL Workbench

## Project Structure

```text
Event Management/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── Backend/
    ├── server.js
    ├── db.js
    ├── database.sql
    ├── package.json
    ├── .env.example
    ├── .gitignore
    └── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/badihehalnikitha/Eventora-Event-Management.git
```

### 2. Navigate to the Backend Folder

```bash
cd Eventora-Event-Management/Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file using `.env.example`.

Add your local MySQL database credentials and configuration.

### 5. Set Up the Database

Open `database.sql` in MySQL Workbench and execute the SQL commands.

### 6. Start the Backend Server

```bash
npm start
```

The backend server runs at:

`http://localhost:5000`

### 7. Run the Frontend

Open the frontend HTML file using VS Code Live Server.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server status |
| POST | `/api/inquiries` | Submit an inquiry |
| GET | `/api/inquiries` | Retrieve inquiries |
| PUT | `/api/inquiries/:id/status` | Update inquiry status |
| DELETE | `/api/inquiries/:id` | Delete an inquiry |

## Project Objective

The main objective of Eventora is to simplify event inquiry management by connecting a user-friendly frontend with a Node.js backend and MySQL database.

## Future Enhancements

- User authentication and authorization.
- Online payment integration.
- Event booking confirmation.
- Admin dashboard.
- Event tracking and management.

## Author

**Nikitha Badinehal**

B.Tech – Computer Science and Engineering

GitHub: [badihehalnikitha](https://github.com/badihehalnikitha)
