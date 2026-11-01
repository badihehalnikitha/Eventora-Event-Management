require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Check that the API and database are reachable.
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ success: true, message: "Eventora API and MySQL are connected." });
  } catch (error) {
    console.error("Health check failed:", error.message);
    res.status(500).json({ success: false, message: "Database connection failed." });
  }
});

// Save a booking/inquiry submitted by the existing frontend.
app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, email, phone, eventType, guests, budgetRange, message = "" } = req.body;

    if (!name || !email || !phone || !eventType || !guests || !budgetRange) {
      return res.status(400).json({ message: "Please provide all required booking details." });
    }

    const guestCount = Number.parseInt(guests, 10);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      return res.status(400).json({ message: "Guests must be a number greater than zero." });
    }

    const sql = `
      INSERT INTO inquiries
        (name, email, phone, event_type, guests, budget_range, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      name.trim(),
      email.trim(),
      phone.trim(),
      eventType,
      guestCount,
      budgetRange,
      message
    ]);

    res.status(201).json({
      success: true,
      message: "Thank you! Your booking inquiry has been submitted.",
      inquiryId: result.insertId
    });
  } catch (error) {
    console.error("Create inquiry error:", error.message);
    res.status(500).json({ message: "Unable to save your inquiry. Please try again." });
  }
});

// Retrieve all booking inquiries (for a future admin page).
app.get("/api/inquiries", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM inquiries ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Fetch inquiries error:", error.message);
    res.status(500).json({ message: "Unable to retrieve inquiries." });
  }
});

// Update the status of an inquiry, for example: Pending, Confirmed, Cancelled.
app.put("/api/inquiries/:id/status", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Confirmed", "Cancelled"];

    if (!Number.isInteger(id) || id < 1 || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Provide a valid inquiry ID and status." });
    }

    const [result] = await pool.execute(
      "UPDATE inquiries SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.json({ success: true, message: "Inquiry status updated." });
  } catch (error) {
    console.error("Update inquiry error:", error.message);
    res.status(500).json({ message: "Unable to update inquiry." });
  }
});

// Delete an inquiry.
app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid inquiry ID." });
    }

    const [result] = await pool.execute(
      "DELETE FROM inquiries WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Delete inquiry error:", error.message);
    res.status(500).json({ message: "Unable to delete inquiry." });
  }
});

app.listen(PORT, () => {
  console.log(`Eventora backend running at http://localhost:${PORT}`);
});
