<html>
    <head>
        <title>Login</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="{{ URL::asset('js/login.js') }}"></script>
    </head>
    <body>
        <form>
            @csrf
            <input type="text" name="username" placeholder="Username" id="username">
            <span id="err_username"></span>
            <input type="password" name="password" placeholder="password" id="password">
            <span id="err_password"></span>
            <button type="button" id="login">Login</button>

        </form>
    </body>
</html>