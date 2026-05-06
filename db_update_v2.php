<?php
require_once 'config.php';

$conn = getDBConnection();

// Add has_seating to events
$sql1 = "SHOW COLUMNS FROM events LIKE 'has_seating'";
$res1 = $conn->query($sql1);
if ($res1 && $res1->num_rows == 0) {
    $alter1 = "ALTER TABLE events ADD COLUMN has_seating TINYINT(1) DEFAULT 0 AFTER total_tickets";
    if ($conn->query($alter1)) echo "Column 'has_seating' added to events.<br>";
    else echo "Error: " . $conn->error . "<br>";
} else {
    echo "Column 'has_seating' already exists.<br>";
}

// Add seats to bookings
$sql2 = "SHOW COLUMNS FROM bookings LIKE 'seats'";
$res2 = $conn->query($sql2);
if ($res2 && $res2->num_rows == 0) {
    $alter2 = "ALTER TABLE bookings ADD COLUMN seats VARCHAR(255) NULL AFTER num_tickets";
    if ($conn->query($alter2)) echo "Column 'seats' added to bookings.<br>";
    else echo "Error: " . $conn->error . "<br>";
} else {
    echo "Column 'seats' already exists.<br>";
}

$conn->close();
?>
