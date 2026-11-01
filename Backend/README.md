# Eventora Backend

Backend for the Eventora frontend using Node.js, Express.js and MySQL.

## 1. Requirements
- Node.js and npm
- MySQL Server
- MySQL Workbench (recommended)

## 2. Create the database
1. Open MySQL Workbench and connect to your local MySQL server.
2. Open `database.sql`.
3. Execute the complete SQL script. It creates the `eventora` database and `inquiries` table.

## 3. Configure the database connection
1. In this backend folder, create a file named `.env`.
2. Copy the contents of `.env.example` into `.env`.
3. Replace `your_mysql_password` with your actual MySQL root password.
4. If your MySQL username is not `root`, update `DB_USER`.

Do not share or upload your `.env` file to GitHub.

## 4. Install dependencies
Open a terminal in this backend folder and run:

```bash
npm install
```

## 5. Start the backend
Run:

```bash
npm start
```

You should see:

```text
Eventora backend running at http://localhost:5000
```

Open `http://localhost:5000/api/health` in your browser. A successful response confirms the API and database connection.

## 6. Connect your frontend
Your current `script(2).js` already sends booking data to:

```text
POST http://localhost:5000/api/inquiries
```

Keep that API URL. Make sure the frontend form uses the names:
`name`, `email`, `phone`, `event-type`, `guests`, `budget`, and `message`.

In `test(1).html`, remove the script tag from the `<head>`:

```html
<script src="script.js"></script>
```

Keep the script include immediately before `</body>` so the HTML elements exist before JavaScript runs. Ensure the actual filename is `script.js`, or change the tag to the filename you use.

## 7. API endpoints
- `POST /api/inquiries` — save a booking inquiry
- `GET /api/inquiries` — view all inquiries
- `PUT /api/inquiries/:id/status` — update status
- `DELETE /api/inquiries/:id` — delete an inquiry
- `GET /api/health` — test API and database connection

The GET, PUT and DELETE endpoints are intended for a future admin interface. Add authentication and authorization before exposing admin operations publicly.
