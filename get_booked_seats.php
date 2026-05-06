<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$event_id = isset($_GET['event_id']) ? (int)$_GET['event_id'] : 0;

if ($event_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid event ID']);
    exit();
}

$conn = getDBConnection();
$stmt = $conn->prepare("SELECT seats FROM bookings WHERE event_id = ? AND seats IS NOT NULL AND seats != ''");
$stmt->bind_param('i', $event_id);
$stmt->execute();
$result = $stmt->get_result();

$booked_seats = [];
while ($row = $result->fetch_assoc()) {
    $seats_array = array_map('trim', explode(',', $row['seats']));
    $booked_seats = array_merge($booked_seats, $seats_array);
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'booked_seats' => $booked_seats]);
?>
