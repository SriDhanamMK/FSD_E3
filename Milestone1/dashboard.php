<?php
include("../includes/db.php");
session_start();

if(!isset($_SESSION['user_id'])){
    header("Location: ../auth/login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Get latest subscription
$query = mysqli_query($conn,"
SELECT plans.plan_name, subscriptions.end_date
FROM subscriptions
JOIN plans ON subscriptions.plan_id = plans.id
WHERE subscriptions.user_id='$user_id'
ORDER BY subscriptions.id DESC LIMIT 1
");

$data = mysqli_fetch_assoc($query);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

<div class="container mt-5">
    <h2>Welcome to Dashboard 🎉</h2>

    <?php if($data){ ?>

        <!-- PLAN DETAILS -->
        <div class="alert alert-success">
            <h4>Your Plan: <?php echo $data['plan_name']; ?></h4>
            <p>Expiry Date: <?php echo $data['end_date']; ?></p>
        </div>

        <!-- TIER FEATURES -->
        <?php
        if($data['plan_name'] == "Basic"){
            echo "<div class='card p-3 mb-3'>✔ Basic Content Access</div>";
        }
        elseif($data['plan_name'] == "Premium"){
            echo "<div class='card p-3 mb-3'>✔ Premium + Download Access</div>";
        }
        else{
            echo "<div class='card p-3 mb-3'>✔ Gold Full Access + Priority Support</div>";
        }
        ?>

        <!-- CHANGE PLAN BUTTON -->
        <a href="../pricing.php" class="btn btn-warning">Change Plan</a>

    <?php } else { ?>

        <div class="alert alert-warning">
            You do not have any subscription.
            <br><br>
            <a href="../pricing.php" class="btn btn-primary">Subscribe Now</a>
        </div>

    <?php } ?>

    <br><br>

    <!-- LOGOUT -->
    <a href="logout.php" class="btn btn-danger">Logout</a>

</div>

</body>
</html>