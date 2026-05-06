<?php
$data = ['event_id'=>1, 'user_name'=>'test', 'email'=>'test@test.com', 'department'=>'test', 'num_tickets'=>1, 'vtu'=>''];
$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
        'ignore_errors' => true,
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost/FullStack.ModelLab/book_ticket.php', false, $context);
echo "RESPONSE:\n" . $result;
?>
