$(document).ready(function(){ 
    var product_id = "";
    var thisRef = "";
    var segments = location.href.split('/');
    var action = segments[3];
    if(action == "add_rate"){
        fetchProductRateList();
    }else if(action == "add_product"){
        fetchProductList()
    }else if(action == "product_stock_management"){
        fetchProductListStockManagement()
    }


    $(document).on('click', '.add_price', function(){
        var id = $(this).attr('id');
        var sell_price = $(this).parent().parent().find('td:eq(2) #new_price').val();
        var rate_title = $('#rate_title').val();
        
        // alert(sell_price);
        // return;
        if(!sell_price == "" || !rate_title==""){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            $.ajax({
                type: 'GET',
                url: '/Add_sell_price_inventory',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id,
                    rate_title: rate_title,
                    sell_price: sell_price
                },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchProductRateList();
                        $('.add_price').text('Add Quantity');
                        $('.add_price').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Price added successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('.add_price').text('Add Quantity');
                        $('.add_price').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to add price');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }     
                }
            });
        }else{
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please enter new price');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
        }
    });

    $(document).on('click', '.remove_price', function(){
        var id = $(this).attr('id');
        var rate_title = $('#rate_title').val();
        var sell_price = $(this).parent().parent().find('td:eq(2) #new_price').val();
        if(!sell_price == "" || !rate_title == ""){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            $.ajax({
                type: 'GET',
                url: '/Remove_price_Inventory',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id,
                    rate_title: rate_title,
                    sell_price: sell_price
                },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchProductRateList();
                        $('.remove_price').text('Remove Quantity');
                        $('.remove_price').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Price subtracted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('.remove_price').text('Remove Quantity');
                        $('.remove_price').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to subtract price');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }     
                }
            });
        }else{
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please enter new price');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
        }
    })

    $(document).on('click', '.add_filled', function(){
        product_id = $(this).attr('id');
        thisRef = $(this);
        $('#open_modal').click(); 
    });

    $(document).on('click', '#add_filled_bottles_modal', function(){
        var filled_quantity = $('#filled_bottles_quantity').val();
        if(filled_quantity == ""){
            $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please enter quantity!');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
            return;
        }
        thisRef.text('PROCESSING....');
        $('.add_filled').attr("disabled", "disabled");
        $.ajax({
            type: 'GET',
            url: '/add_filled_bottle_quantity',
            data: {
                _token: '{!! csrf_token() !!}',
                product_id: product_id,
                filled_quantity: filled_quantity
           },
            success: function(response) {
                $('#cancel_btn_modal').click();
                if(JSON.parse(response) == "success"){
                    fetchProductListStockManagement();
                    thisRef.text('Add');
                    $('.add_filled').removeAttr('disabled');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Added Successfully!');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    $('#filled_bottles_quantity').val("");
                }else if(JSON.parse(response) == "failed"){
                    thisRef.text('Add');
                    $('.add_filled').removeAttr('disabled');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to add');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    $('#filled_bottles_quantity').val("");
                }    
            }
        });
    });

    $(document).on('click', '#cancel_btn_modal', function(){
        product_id = "";
    });

});

function fetchProductRateList() {
    $.ajax({
        type: 'GET',
        url: '/GetInventoryListToAddRate',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>Name</th><th>Cost Price</th><th>New Price</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#StockListTable tbody').append('<tr><td><span>' + element['name'] + '</span></td><td>' + element['purchase_price'] + '</td><td><input type="number" value="" id="new_price"/></td><td><button id="' + element['id'] + '" class="btn btn-default btn-line add_price">Add Price</button><button id="' + element['id'] + '" class="btn btn-default btn-line red-bg remove_price">Subtract Price</button></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}

function fetchProductList() {
    $.ajax({
        type: 'GET',
        url: '/GetRateList',
        success: function(response) {
            console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>Rate Title</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#StockListTable tbody').append('<tr><td><span>' + element['rate_title'] + '</span></td><td><button id="' + element['id'] + '" class="btn btn-default btn-line edit">Edit</button><button id="' + element['id'] + '" class="btn btn-default btn-line red-bg delete">Delete</button></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}

function fetchProductListStockManagement() {
    $.ajax({
        type: 'GET',
        url: '/GetInventoryListStockManagement',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>ID</th><th>Name</th><th>Stock</th><th>Sold</th><th>Filled</th><th>Empty</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#StockListTable tbody').append('<tr><td><span>' + element['id'] + '</span></td><td><span>' + element['name'] + '</span></td><td>' + element['quantity'] + '</td><td>' + "Sold" + '</td><td>' + element['filled_bottles'] + '</td><td>' + "Empty" + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line add_filled">Add</button></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}