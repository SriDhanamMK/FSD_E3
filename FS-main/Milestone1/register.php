<?php
include("../includes/db.php");
include("../includes/header.php");

if(isset($_POST['register'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name,email,password) VALUES ('$name','$email','$password')";
    mysqli_query($conn,$sql);

    echo "<div class='alert alert-success text-center'>Registration Successful!</div>";
}
?>

<div class="container mt-5" style="max-width:400px;">
    <h3 class="mb-4 text-center">Register</h3>
    <form method="POST">
        <input type="text" name="name" class="form-control mb-3" placeholder="Name" required>
        <input type="email" name="email" class="form-control mb-3" placeholder="Email" required>
        <input type="password" name="password" class="form-control mb-3" placeholder="Password" required>
        <button type="submit" name="register" class="btn btn-primary w-100">Register</button>
    </form>
</div>

<?php include("../includes/footer.php"); ?>