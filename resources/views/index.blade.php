<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>HOME</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <link rel="stylesheet" type="text/css" media="screen" href="main.css" /> --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="{{ URL::asset('js/main.js') }}"></script>
    
</head>
<body>
    <!-- Sign up form -->
    <form method="post">
        @csrf
        <input type="text" name="name" placeholder="Name" id="name">
        <span id='err_name'></span>
        <input type="text" name="email" placeholder="Email" id="email">
        <span id='err_email'></span>
        <input type="text" name="username" placeholder="Username" id="username">
        <span id='err_username'></span>
        <input type="password" name="password" placeholder="Password" id="password">
        <span id='err_password'></span>
        <button type="button" id="signup">Sign Up</button>
    </form>
</body>
</html>