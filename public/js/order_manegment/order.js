$(document).ready(function(){ 
    fetchCustomersAndOrders();

    $(document).on('change', '#customer_name', function(){
        var current_quantity = $(this).val();
        $('.add_order_btn').attr("id", current_quantity);
    });

    $(document).on('click', '.add_order_btn', function(){
        if($(this).attr('id') == 0){
            alert('please select customer');
        }else{
            alert($(this).attr('id'));
        }
    });


});


function fetchCustomersAndOrders() {
    $.ajax({
        type: 'GET',
        url: '/GetCustomersAndOrders',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>Customer</th><th>Product</th><th>Sold QTY</th><th>Return QTY</th><th>Amount</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            var response = JSON.parse(response);
            $('#StockListTable tbody').append('<tr><td><span><select id="customer_name"><option value="0" selected disabled>Select Customers</option>'+ (!response.customers.length == 0 ? '<option value="1">Not empty</option>' : "" )+'</select></span></td><td><select id="product_name"><option value="0" selected disabled>Select Products</option>'+ (!response.inventory.length == 0 ? '<option value="1">Not empty</option>' : "" )+'</select></td><td><input type="number" value="" id="sold_qty"/></td><td><input type="number" value="" id="return_qty"/></td><td><input type="number" value="" id="amount"/></td><td><button id="0" class="add_order_btn btn btn-default btn-line add_price">Add Price</button></td></tr>');
            // });
            var response = JSON.parse(response);
            // response.forEach(element => {
            //     $('#StockListTable tbody').append('<tr><td><span>' + element['name'] + '</span></td><td>' + element['purchase_price'] + '</td><td><input type="number" value="" id="new_price"/></td><td><button id="' + element['id'] + '" class="btn btn-default btn-line add_price">Add Price</button><button id="' + element['id'] + '" class="btn btn-default btn-line red-bg remove_price">Subtract Price</button></td></tr>');
            // });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}