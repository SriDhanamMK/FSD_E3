<?php
include("../includes/db.php");
session_start();

if(!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin'){
    header("Location: ../auth/login.php");
    exit();
}

$result = mysqli_query($conn, "
SELECT subscriptions.*, users.name, users.email, plans.plan_name 
FROM subscriptions
JOIN users ON subscriptions.user_id = users.id
JOIN plans ON subscriptions.plan_id = plans.id
ORDER BY subscriptions.id DESC
");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Subscriptions</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <h2>All Subscriptions</h2>

    <table class="table table-bordered mt-4">
        <thead>
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <?php while($row = mysqli_fetch_assoc($result)) { ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['name']; ?></td>
                    <td><?php echo $row['email']; ?></td>
                    <td><?php echo $row['plan_name']; ?></td>
                    <td><?php echo $row['start_date']; ?></td>
                    <td><?php echo $row['end_date']; ?></td>
                    <td>
                        <?php 
                        if(strtotime($row['end_date']) >= time()){
                            echo "<span class='badge bg-success'>Active</span>";
                        } else {
                            echo "<span class='badge bg-danger'>Expired</span>";
                        }
                        ?>
                    </td>
                </tr>
            <?php } ?>
        </tbody>
    </table>

    <a href="dashboard.php" class="btn btn-secondary">Back to Dashboard</a>
</div>

</body>
</html>