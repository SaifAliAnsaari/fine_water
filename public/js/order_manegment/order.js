$(document).ready(function(){ 
    fetchCustomersAndOrders();

    // $(document).on('change', '#customer_name', function(){
    //     var current_quantity = $(this).val();
    //     $('.add_order_btn').attr("id", current_quantity);
    // });

    // $(document).on('click', '.add_order_btn', function(){
    //     if($(this).attr('id') == 0){
    //         alert('please select customer');
    //     }else{
    //         alert($(this).attr('id'));
    //     }
    // });

    var place_order_array = [];

    $('#datepicker').datepicker({
        format: 'mm-dd-yyyy'
    });

    $(document).on('click', '.add_product_btn', function(){
        if($('#datepicker').val() == "" || $('#delivery_team').val() == 0 || $('#route').val() == 0 || $('#select_cust').val() == 0 || $('#select_cust').val() == null || $('#route').val() == null || $('#delivery_team').val() == null){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please fill all fields.');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }
        $('.select_products_for_order').show();
        $('.showlisting').show();
        $('.add_payment_div').hide();
        $('.process_btn').show();
    });

    // $(document).on('click', '.add_payment', function(){
    //     if($('#datepicker').val() == "" || $('#delivery_team').val() == 0 || $('#route').val() == 0 || $('#select_cust').val() == 0 || $('#select_cust').val() == null || $('#route').val() == null || $('#delivery_team').val() == null){
    //         $('#notifDiv').fadeIn();
    //         $('#notifDiv').css('background', 'red');
    //         $('#notifDiv').text('Please fill all fields.');
    //         setTimeout(() => {
    //             $('#notifDiv').fadeOut();
    //         }, 3000);
    //         return;
    //     }
    //     $('.add_payment_div').show();
    //     $('.select_products_for_order').hide();
    //     $('.showlisting').hide();
    //     $('.process_btn').hide();
    // });

    $(document).on('click', '.add_order', function(){
        if($('#select_pro').val() == 0 || $('#select_pro').val() == null || $('#sold_qty').val() == "" || $('#return_qty').val() == ""){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please fill all fields.');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }
        var product_id = $('#select_pro').val();
        var sold_qty = $('#sold_qty').val();
        var return_qty = $('#return_qty').val();
        var pro_name = $('#select_pro').find('option:selected').attr("name");
        var prod_id_found = false;
        place_order_array.find(x => {
            //debugger;
            if(x.product_id == product_id){
                x.sold_qty = sold_qty;
                x.return_qty = return_qty;
                prod_id_found = true;
                $(this).text('Added');
                setTimeout(() => {
                    $(this).text('Add');
                }, 1000);
                return;
            }
        });
        

        if(!prod_id_found){
            place_order_array.push({"product_id": product_id, "product_name": pro_name, "sold_qty": sold_qty, "return_qty": return_qty});
            $(this).text('Added');
            setTimeout(() => {
                $(this).text('Add');
            }, 1000);
        }

        console.log(place_order_array);
        if(place_order_array != ""){
            $('.showlisting').empty();
            place_order_array.forEach(element => {
                $('.showlisting').append('<div class="row alert alert-color _add-list" role="alert"><div class="col-md-6"><strong>Product:</strong> '+ element.product_name +' </div> <div class="col-md-3"><strong>Sold QTY:</strong> '+ element.sold_qty +' </div><div class="col-md-3"><strong>Return QTY:</strong> '+element.return_qty +' </div><button id="'+ element.product_id +'" type="button" class="close alert_close delete_one_row" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span> </button></div>');
            });
        }

    });

    $(document).on('click', '.process_order', function(){
        if(place_order_array.length == 0){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Add something to order.');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }
         $('.add_payment_div').show();
        // $('.select_products_for_order').hide();
        // $('.showlisting').hide();
        // $('.process_btn').hide();
    });

    $(document).on('click', '.add_payment_btn', function(){

        if($('#total_payment').val() == "" || place_order_array == ""){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Payment field is empty');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        var thisRef = $(this);
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");
        var date = $('#datepicker').val();
        var delivery_team = $('#delivery_team').val();
        var zone = $('#route').val();
        var customer = $('#select_cust').val();
        var price = $('#total_payment').val();
        // console.log(place_order_array);
        // return;

        $.ajax({
            type: 'GET',
            url: '/place_order',
            data: {
                _token: '{!! csrf_token() !!}',
               date: date,
               delivery_team: delivery_team,
               zone: zone,
               customer: customer,
               place_order_array: place_order_array,
               price: price
           },
            success: function(response) {
                console.log(response);
                if(JSON.parse(response) == "success"){
                   // fetchCompaniesList();
                   thisRef.removeAttr('disabled');
                   thisRef.text('Add Payment');

                   $('.select_products_for_order').hide();
                    $('.showlisting').hide();
                    $('.add_payment_div').hide();
                    $('.process_btn').hide();
                    place_order_array = "";
                    $('#delivery_team').val() = 0;
                    $('#route').val() = 0;
                    $('#select_cust').val() = 0;
                    $('#select_pro').val() = 0;
                    $('#sold_qty').val('');
                    $('#return_qty').val('');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Order placed successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "failed"){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to place order');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }    
            }
        });
    });

});


function fetchCustomersAndOrders() {
    $.ajax({
        type: 'GET',
        url: '/GetCustomersAndOrders',
        success: function(response) {
            //console.log(response);
            $('.body_table').empty();
            $('.body_table').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>Order ID</th><th>Customer</th><th>Recieve Payment</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            // });
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#StockListTable tbody').append('<tr><td><span>' + element['id'] + '</span></td><td>' + element['customer_id'] + '</td><td>' + element['price'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default view_detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button><button id="' + element['id'] + '" class="btn btn-default red-bg delete">Delete</button></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}