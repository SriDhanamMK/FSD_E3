<?php
// ============================================
// API: Get All Events
// Endpoint: GET /ticket-booking/get_events.php
// ============================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config.php';

$conn = getDBConnection();

$sql = "SELECT id, event_name, department, event_date, event_time, venue, ticket_price, total_tickets, available_tickets, description FROM events ORDER BY event_date ASC";
$result = $conn->query($sql);

if ($result) {
    $events = [];
    while ($row = $result->fetch_assoc()) {
        $row['ticket_price'] = (float)$row['ticket_price'];
        $row['total_tickets'] = (int)$row['total_tickets'];
        $row['available_tickets'] = (int)$row['available_tickets'];
        $events[] = $row;
    }
    echo json_encode(['success' => true, 'events' => $events]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch events.']);
}

$conn->close();
?>