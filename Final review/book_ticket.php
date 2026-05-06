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
$vtu        = isset($input['vtu'])         ? trim($input['vtu'])           : '';
$user_name  = isset($input['user_name'])   ? trim($input['user_name'])     : '';
$email      = isset($input['email'])       ? trim($input['email'])         : '';
$department = isset($input['department'])  ? trim($input['department'])    : '';
$num_tickets= isset($input['num_tickets']) ? (int)$input['num_tickets']    : 0;
$seats      = isset($input['seats']) && is_array($input['seats']) ? implode(',', $input['seats']) : '';
 
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
    $stmt = $conn->prepare("SELECT id, event_name, ticket_price, available_tickets, has_seating FROM events WHERE id = ? FOR UPDATE");
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
    $stmt = $conn->prepare("INSERT INTO bookings (event_id, vtu, user_name, email, department, num_tickets, seats, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('issssssd', $event_id, $vtu, $user_name, $email, $department, $num_tickets, $seats, $total_amount);
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
 
    // Send Email Notification
    $subject = "Booking Confirmation - " . $event['event_name'];
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@eventpass.com" . "\r\n";
    
    $message = "
    <html>
    <head><title>Booking Confirmation</title></head>
    <body>
        <h2>Thank you for booking, $user_name!</h2>
        <p>Your tickets for <strong>{$event['event_name']}</strong> are confirmed.</p>
        <p><strong>Booking ID:</strong> " . str_pad($booking_id, 5, '0', STR_PAD_LEFT) . "</p>
        <p><strong>Tickets:</strong> $num_tickets</p>";
    if (!empty($seats)) {
        $message .= "<p><strong>Seats:</strong> $seats</p>";
    }
    $message .= "
        <p><strong>Total Paid:</strong> ₹$total_amount</p>
        <br>
        <p>Enjoy the event!</p>
    </body>
    </html>
    ";
    
    @mail($email, $subject, $message, $headers); // @ used to suppress warning if XAMPP SMTP is not configured
    
    // SIMULATE EMAIL FOR LOCAL TESTING
    $log_entry = "<div style='border:1px solid #ccc; margin:20px; padding:20px; font-family:sans-serif;'>";
    $log_entry .= "<div style='background:#f4f4f4; padding:10px; border-bottom:1px solid #ddd;'>";
    $log_entry .= "<strong>To:</strong> " . htmlspecialchars($email) . "<br>";
    $log_entry .= "<strong>Subject:</strong> " . htmlspecialchars($subject) . "<br>";
    $log_entry .= "<strong>Date:</strong> " . date('Y-m-d H:i:s') . "</div>";
    $log_entry .= "<div style='padding-top:15px;'>" . $message . "</div></div>\n";
    file_put_contents(__DIR__ . '/emails.html', $log_entry, FILE_APPEND);

    echo json_encode([
        'success'          => true,
        'message'          => 'Booking confirmed successfully!',
        'booking_id'       => $booking_id,
        'user_name'        => $user_name,
        'event_name'       => $event['event_name'],
        'num_tickets'      => $num_tickets,
        'seats'            => $seats,
        'total_amount'     => $total_amount,
        'available_tickets'=> $new_available
    ]);
 
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
 
$conn->close();
