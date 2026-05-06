<?php
// ============================================
// Database Configuration
// Place this file in: C:/xampp/htdocs/ticket-booking/
// ============================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // Default XAMPP MySQL user
define('DB_PASS', '');           // Default XAMPP MySQL password (empty)
define('DB_NAME', 'ticket_booking');

function getDBConnection() {
    try {
        // Set mysqli to throw exceptions on error
        mysqli_report(MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ERROR);
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $conn->set_charset('utf8');
        return $conn;
    } catch (mysqli_sql_exception $e) {
        header('Content-Type: application/json');
        die(json_encode([
            'success' => false,
            'message' => 'Database connection failed. Please ensure XAMPP MySQL is running.'
        ]));
    }
}
?>