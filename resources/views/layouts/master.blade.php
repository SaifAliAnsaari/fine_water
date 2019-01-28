<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Sell3Sixty</title>

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,700,800" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
    <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/css/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/css/select2-bootstrap4.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css?v=2.2.2">
    <link rel="stylesheet" type="text/css" href="/css/dropify.min.css" />
    <link href="/css/datepicker.css" rel="stylesheet">
    {{-- <link rel="stylesheet" type="text/css" href="/css/dropzone.css" /> --}}
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.1/dropzone.css"/>

</head>

<body id="page-top">

    <div class="overlay"></div>
    
    <div id="notifDiv" style="z-index:10000; display: none; background: green; font-weight: 450; width: 350px; position: fixed; top: 80%; left: 5%; color: white; padding: 5px 20px">
    </div>

    @include('includes.nav')
    @include('includes.modals')
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
    <script src="/js/master.js?v=2.2.0" ></script>
    <script src="/js/jquery.form.min.js" ></script>
    <script src="/js/bootstrap-datepicker.js"></script>
    <script type = "text/javascript" src"https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.1/dropzone.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
    {{-- <script src="/js/dropzone.js"></script>
    <script src="/js/dropzone-data.js"></script> --}}
    @if($controller == "Customer")
        <script src="/js/custom/customer.js?v=2.2.3" ></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBuhmMCJmm69FrsFzQdhjq5B86AIDor9Q0">
        </script>
    @elseif($controller == "RegisterController")
        <script src="/js/custom/employee.js?v=2.2.0" ></script>
    @elseif($controller == "Clients")
        <script src="/js/client/clients.js?v=2.2.0" ></script>
    @elseif($controller == "Regions")
        <script src="/js/region/city.js?v=2.2.0" ></script>
    @elseif($controller == "Delivery")
        <script src="/js/delivery/delivery_team.js?v=2.2.0" ></script>
    @elseif($controller == "InventoryMenagement")
        <script src="/js/inventory/inventory_menagment.js?v=2.2.0" ></script>
    @elseif($controller == "ManageBilling")
        <script src="/js/billing/manage_billing.js?v=2.2.0" ></script>
    @elseif($controller == "ProductManegment")
        <script src="/js/product_manegment/product_manegment.js?v=2.2.0" ></script>
    @elseif($controller == "OrderManagement")
        <script src="/js/order_manegment/order.js?v=2.2.0" ></script>
    @endif

</body>

</html>