<!DOCTYPE html>
<html>
<head>
    <title>Membership System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #4e73df, #1cc88a);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            padding: 40px;
            border-radius: 15px;
            text-align: center;
        }
    </style>
</head>

<body>

<div class="card shadow-lg">
    <h2 class="mb-4">Welcome to Membership System</h2>
    <p class="mb-4">Choose an option to continue</p>

    <a href="auth/login.php" class="btn btn-primary w-100 mb-3">Login</a>
    <a href="auth/register.php" class="btn btn-success w-100">Register</a>
</div>

</body>
</html>