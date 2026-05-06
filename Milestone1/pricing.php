<?php
include("includes/db.php");
session_start();

$result = mysqli_query($conn,"SELECT * FROM plans");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Membership Plans</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container py-5">
    <h2 class="text-center mb-5">Choose Your Plan</h2>

    <div class="row">

        <?php while($row = mysqli_fetch_assoc($result)) { ?>

        <div class="col-md-4">
            <div class="card shadow-lg border-0 text-center p-4 mb-4">

                <h3><?php echo $row['plan_name']; ?></h3>
                <h2 class="text-primary">₹<?php echo $row['price']; ?></h2>
                <p><?php echo $row['duration']; ?> Days Access</p>

                <?php if(isset($_SESSION['user_id'])) { ?>
                    
                    <!-- SUBSCRIBE BUTTON -->
                    <a href="subscribe.php?plan_id=<?php echo $row['id']; ?>" 
                       class="btn btn-success w-100">
                       Subscribe
                    </a>

                <?php } else { ?>

                    <a href="auth/login.php" class="btn btn-primary w-100">
                        Login to Subscribe
                    </a>

                <?php } ?>

            </div>
        </div>

        <?php } ?>

    </div>
</div>

</body>
</html>