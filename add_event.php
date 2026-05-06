<?php
header('Content-Type: application/json');
require_once 'config.php';

$conn = getDBConnection();
$data = json_decode(file_get_contents("php://input"), true);

$available = $data['total_tickets'];

$has_seating = isset($data['has_seating']) ? (int)$data['has_seating'] : 0;

$stmt = $conn->prepare("INSERT INTO events 
(event_name, department, event_date, event_time, venue, ticket_price, total_tickets, has_seating, available_tickets, description) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssdiiss",
  $data['event_name'],
  $data['department'],
  $data['event_date'],
  $data['event_time'],
  $data['venue'],
  $data['ticket_price'],
  $data['total_tickets'],
  $has_seating,
  $available,
  $data['description']
);

if($stmt->execute()){
  echo json_encode(["success"=>true,"message"=>"Event added successfully"]);
} else {
  echo json_encode(["success"=>false,"message"=>"Failed to add event"]);
}
?>