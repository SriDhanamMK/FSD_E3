<?php
// ============================================
// API: Get Bookings for Event
// Endpoint: GET /ticket-booking/get_event_bookings.php
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

$event_id = isset($_GET['event_id']) ? (int)$_GET['event_id'] : 0;

if ($event_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid event ID.']);
    exit;
}

$conn = getDBConnection();

$stmt = $conn->prepare("SELECT b.id, b.vtu, b.user_name, b.email, b.department, b.num_tickets, b.seats, b.total_amount, b.booking_date FROM bookings b WHERE b.event_id = ? ORDER BY b.booking_date DESC");
$stmt->bind_param('i', $event_id);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $row['num_tickets']  = (int)$row['num_tickets'];
    $row['total_amount'] = (float)$row['total_amount'];
    $bookings[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'bookings' => $bookings]);
?>
