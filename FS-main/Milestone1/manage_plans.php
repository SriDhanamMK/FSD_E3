<?php
include("../includes/db.php");
session_start();

if(!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin'){
    header("Location: ../auth/login.php");
    exit();
}

// Delete plan
if(isset($_GET['delete'])){
    $id = $_GET['delete'];
    mysqli_query($conn, "DELETE FROM plans WHERE id=$id");
    header("Location: manage_plans.php");
    exit();
}

// Add plan
if(isset($_POST['add'])){
    $name = $_POST['name'];
    $price = $_POST['price'];
    $duration = $_POST['duration'];

    mysqli_query($conn, "
    INSERT INTO plans (plan_name, price, duration)
    VALUES ('$name', '$price', '$duration')
    ");

    header("Location: manage_plans.php");
    exit();
}

$result = mysqli_query($conn, "SELECT * FROM plans");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Plans</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <h2>Manage Plans</h2>

    <form method="POST" class="row g-3 mt-3">
        <div class="col-md-3">
            <input type="text" name="name" class="form-control" placeholder="Plan Name" required>
        </div>
        <div class="col-md-3">
            <input type="number" name="price" class="form-control" placeholder="Price" required>
        </div>
        <div class="col-md-3">
            <input type="number" name="duration" class="form-control" placeholder="Duration (Days)" required>
        </div>
        <div class="col-md-3">
            <button type="submit" name="add" class="btn btn-success">Add Plan</button>
        </div>
    </form>

    <table class="table table-bordered mt-4">
        <thead>
            <tr>
                <th>ID</th>
                <th>Plan Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php while($row = mysqli_fetch_assoc($result)) { ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['plan_name']; ?></td>
                    <td>₹<?php echo $row['price']; ?></td>
                    <td><?php echo $row['duration']; ?> Days</td>
                    <td>
                        <a href="manage_plans.php?delete=<?php echo $row['id']; ?>" 
                           class="btn btn-danger btn-sm"
                           onclick="return confirm('Delete this plan?');">
                           Delete
                        </a>
                    </td>
                </tr>
            <?php } ?>
        </tbody>
    </table>

    <a href="dashboard.php" class="btn btn-secondary">Back to Dashboard</a>
</div>

</body>
</html>