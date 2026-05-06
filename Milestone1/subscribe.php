<?php
include("includes/db.php");
session_start();

if(!isset($_SESSION['user_id'])){
    header("Location: auth/login.php");
    exit();
}

$user_id = $_SESSION['user_id'];
$plan_id = $_GET['plan_id'];

// DELETE OLD SUBSCRIPTION
mysqli_query($conn,"DELETE FROM subscriptions WHERE user_id='$user_id'");

// GET PLAN DETAILS
$plan = mysqli_fetch_assoc(mysqli_query($conn,"SELECT * FROM plans WHERE id='$plan_id'"));

$start_date = date("Y-m-d");
$end_date = date("Y-m-d", strtotime("+".$plan['duration']." days"));

// INSERT NEW PLAN
mysqli_query($conn,"INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, status)
VALUES ('$user_id','$plan_id','$start_date','$end_date','active')");

header("Location: user/dashboard.php");
exit();
?>