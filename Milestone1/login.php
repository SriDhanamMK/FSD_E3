<?php
include("../includes/db.php");
include("../includes/header.php");

if(isset($_POST['login'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = mysqli_query($conn,"SELECT * FROM users WHERE email='$email'");
    $user = mysqli_fetch_assoc($result);

    if($user && password_verify($password, $user['password'])){
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        header("Location: ../user/dashboard.php");
        exit();
    } else {
        echo "<div class='alert alert-danger text-center'>Invalid Credentials</div>";
    }
}
?>

<div class="container mt-5" style="max-width:400px;">
    <h3 class="mb-4 text-center">Login</h3>
    <form method="POST">
        <input type="email" name="email" class="form-control mb-3" placeholder="Email" required>
        <input type="password" name="password" class="form-control mb-3" placeholder="Password" required>
        <button type="submit" name="login" class="btn btn-success w-100">Login</button>
    </form>
</div>

<?php include("../includes/footer.php"); ?>