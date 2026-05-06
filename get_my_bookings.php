<?php
// ============================================
// API: Get My Bookings
// Endpoint: GET /ticket-booking/get_my_bookings.php
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

$vtu = isset($_GET['vtu']) ? trim($_GET['vtu']) : '';

if (empty($vtu)) {
    echo json_encode(['success' => false, 'message' => 'VTU is required.']);
    exit;
}

$conn = getDBConnection();

$stmt = $conn->prepare("
    SELECT b.id, b.event_id, b.booking_date, b.num_tickets, b.seats, b.total_amount, e.event_name, e.event_date, e.event_time, e.venue, e.ticket_price
    FROM bookings b
    JOIN events e ON b.event_id = e.id
    WHERE b.vtu = ?
    ORDER BY b.booking_date DESC
");
$stmt->bind_param('s', $vtu);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $row['num_tickets']  = (int)$row['num_tickets'];
    $row['total_amount'] = (float)$row['total_amount'];
    $row['ticket_price'] = (float)$row['ticket_price'];
    $bookings[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'bookings' => $bookings]);
?>
