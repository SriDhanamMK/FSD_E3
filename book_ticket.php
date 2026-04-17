<?php
// ============================================
// API: Book Tickets
// Endpoint: POST /ticket-booking/book_ticket.php
// ============================================
 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed.']);
    exit();
}
 
require_once 'config.php';
 
// Read JSON body
$input = json_decode(file_get_contents('php://input'), true);
 
if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
    exit();
}
 
// Validate fields
$event_id   = isset($input['event_id'])    ? (int)$input['event_id']       : 0;
$user_name  = isset($input['user_name'])   ? trim($input['user_name'])     : '';
$email      = isset($input['email'])       ? trim($input['email'])         : '';
$department = isset($input['department'])  ? trim($input['department'])    : '';
$num_tickets= isset($input['num_tickets']) ? (int)$input['num_tickets']    : 0;
 
$errors = [];
 
if ($event_id <= 0)         $errors[] = 'Invalid event.';
if (empty($user_name))      $errors[] = 'Name is required.';
if (empty($email))          $errors[] = 'Email is required.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format.';
if (empty($department))     $errors[] = 'Department is required.';
if ($num_tickets <= 0)      $errors[] = 'Number of tickets must be a positive number.';
 
if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit();
}
 
$conn = getDBConnection();
 
// Check event & available tickets (with locking)
$conn->begin_transaction();
 
try {
    $stmt = $conn->prepare("SELECT id, event_name, ticket_price, available_tickets FROM events WHERE id = ? FOR UPDATE");
    $stmt->bind_param('i', $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $event = $result->fetch_assoc();
    $stmt->close();
 
    if (!$event) {
        throw new Exception('Event not found.');
    }
 
    if ($num_tickets > $event['available_tickets']) {
        throw new Exception("Only {$event['available_tickets']} ticket(s) available. You requested {$num_tickets}.");
    }
 
    $total_amount = $num_tickets * $event['ticket_price'];
 
    // Insert booking
    $stmt = $conn->prepare("INSERT INTO bookings (event_id, user_name, email, department, num_tickets, total_amount) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('isssid', $event_id, $user_name, $email, $department, $num_tickets, $total_amount);
    $stmt->execute();
    $booking_id = $conn->insert_id;
    $stmt->close();
 
    // Update available tickets
    $new_available = $event['available_tickets'] - $num_tickets;
    $stmt = $conn->prepare("UPDATE events SET available_tickets = ? WHERE id = ?");
    $stmt->bind_param('ii', $new_available, $event_id);
    $stmt->execute();
    $stmt->close();
 
    $conn->commit();
 
    echo json_encode([
        'success'          => true,
        'message'          => 'Booking confirmed successfully!',
        'booking_id'       => $booking_id,
        'user_name'        => $user_name,
        'event_name'       => $event['event_name'],
        'num_tickets'      => $num_tickets,
        'total_amount'     => $total_amount,
        'available_tickets'=> $new_available
    ]);
 
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
 
$conn->close();
