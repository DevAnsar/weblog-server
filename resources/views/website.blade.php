<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>theJs</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="antialiased">
        <div id="app"></div>
        <!-- Scripts -->
        <script src="{{ asset('js/website.js') }}" type="text/javascript"></script>
    </body>
</html>
