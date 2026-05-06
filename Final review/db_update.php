<?php
require_once 'config.php';

$conn = getDBConnection();

$sql = "SHOW COLUMNS FROM bookings LIKE 'vtu'";
$result = $conn->query($sql);

if ($result && $result->num_rows == 0) {
    $alter_sql = "ALTER TABLE bookings ADD COLUMN vtu VARCHAR(50) NULL AFTER event_id";
    if ($conn->query($alter_sql)) {
        echo "Column 'vtu' added successfully to 'bookings' table.<br>";
    } else {
        echo "Error adding column: " . $conn->error . "<br>";
    }
} else {
    echo "Column 'vtu' already exists in 'bookings' table.<br>";
}

$conn->close();
?>
