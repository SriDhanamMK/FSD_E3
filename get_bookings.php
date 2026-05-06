<?php
// ============================================
// API: Get All Bookings (Admin View)
// Endpoint: GET /ticket-booking/get_bookings.php
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

$conn = getDBConnection();

$sql = "SELECT b.id, b.user_name, b.email, b.department, b.num_tickets, b.total_amount, b.booking_date, e.event_name FROM bookings b JOIN events e ON b.event_id = e.id ORDER BY b.booking_date DESC";
$result = $conn->query($sql);

if ($result) {
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $row['num_tickets']  = (int)$row['num_tickets'];
        $row['total_amount'] = (float)$row['total_amount'];
        $bookings[] = $row;
    }
    echo json_encode(['success' => true, 'bookings' => $bookings]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch bookings.']);
}

$conn->close();
?>