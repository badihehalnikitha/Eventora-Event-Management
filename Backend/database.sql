CREATE DATABASE IF NOT EXISTS eventora;
USE eventora;

CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(60) NOT NULL,
    guests INT NOT NULL,
    budget_range VARCHAR(50) NOT NULL,
    message TEXT,
    status ENUM('Pending', 'Confirmed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
