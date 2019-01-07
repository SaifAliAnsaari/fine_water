<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>E-bob</title>

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,700,800" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
    <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/css/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/css/select2-bootstrap4.css">
    <link rel="stylesheet" type="text/css" href="/css/style.min.css?v=1.2">
    <link rel="stylesheet" type="text/css" href="/css/dropify.min.css" />
    <style>
        #notifDiv{
            display: none;
            background: red;
            color:white;
            font-weight: 400;
            font-size: 15px;
            width: 350px;
            position: fixed;
            top: 80%;
            left: 5%;
            z-index: 1000;
            padding: 10px 20px
        }
    </style>
</head>

<body id="page-top">

    <div class="overlay"></div>
    
    <div id="notifDiv">
    </div>

    @include('includes.nav')
    <div id="wrapper">
        @include('includes.sidebar-menu')
        
        <div id="content-wrapper">
            @include('includes.alerts')
            <div class="container">
                @yield('data-sidebar')
                @yield('content')
                @include('includes.footer')
            </div>
        </div>
    </div>
    <script src="/js/jquery-3.3.1.slim.min.js"></script>
    <script src="/js/popper.min.js" ></script>
    <script src="/js/bootstrap.min.js" ></script>
    <script src="/js/datatables.min.js" ></script>
    <script src="/js/select2.min.js" ></script>
    <script src="/js/dropify.min.js"></script>
    <script src="/js/form-file-upload-data.js"></script>
    <script src="/js/custom.js" ></script>
    <script src="/js/master.js?v=1.0" ></script>
    <script src="/js/jquery.form.min.js" ></script>
    <script src="/js/bootstrap-datepicker.js"></script>
    {{-- <script src="/js/rasterize.js"></script> --}}
    {{-- <script src="/js/html2canvas.js"></script>
    <script src="/js/jspdf.js"></script>
    <script src="/js/pdfFromHTML.js?v={{ time() }}"></script> --}}
    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.5/jspdf.plugin.autotable.js"></script> --}}
    @if($controller == "Customer")
        <script src="/js/custom/customer.js?v=1.0" ></script>
    @elseif($controller == "CustomerTypes")
        <script src="/js/custom/customer-types.js?v=1.0" ></script>
    @elseif($controller == "RegisterController")
        <script src="/js/custom/employee.js?v=1.0" ></script>
    @elseif($controller == "Clients")
        <script src="/js/client/clients.js?v=1.0" ></script>
    @elseif($controller == "Regions")
        <script src="/js/region/city.js?v=1.0" ></script>
    @elseif($controller == "Delivery")
        <script src="/js/delivery/delivery_team.js?v=1.0" ></script>
    @endif

</body>

</html>