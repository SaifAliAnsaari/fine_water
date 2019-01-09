$(document).ready(function(){

    fetchInventoryList();

    var lastOp = "add";
    var client_id = "";
    $(document).on('click', '.openDataSidebarForAddingInventory', function() {
        //alert('here');
        if (lastOp == "update") {
           
            $('#updateInventoryForm').prop('id','saveInventoryForm');
            $('input[name="name"]').val("");
            $('input[name="name"]').blur();

            $('input[name="liter_capacity"]').val("");
            $('input[name="liter_capacity"]').blur();

            $('input[name="sku"]').val("");
            $('input[name="sku"]').blur();

            $('input[name="purchase_price"]').val("");
            $('input[name="purchase_price"]').blur();

            $('input[name="quantity"]').val("");
            $('input[name="quantity"]').blur();

            $('input[name="inventory_id"]').val("");
            $('input[name="old_img"]').val("");
            $('select[name="returnable"]').val(-1).trigger('change');
            
            $('#saveinventory').show();
            $('#updateinventory').hide();   
           
        }
        lastOp = 'add';
        if ($('#saveInventoryForm input[name="_method"]').length) {
            $('#saveInventoryForm input[name="_method"]').remove();
        }
        $('input[id="operation"]').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="compPicture" class="dropify" />');
        $('#compPicture').dropify();
    });


    //save
    $(document).on('click', '#saveinventory', function() {

        if (!$('input[name="name"]').val() || !$('input[name="liter_capacity"]').val() || !$('input[name="sku"]').val()
            || !$('input[name="purchase_price"]').val() || !$('input[name="quantity"]').val() || !$('select[name="returnable"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveinventory').attr('disabled', 'disabled');
        $('#cancelinventory').attr('disabled', 'disabled');
        $('#saveinventory').text('Processing..');

        var ajaxUrl = "/City_inventory";

        $('#saveInventoryForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveInventoryForm').serialize(),
            cache: false,
            success: function(response) {
                //console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchInventoryList();
                    $('#saveinventory').removeAttr('disabled');
                    $('#cancelinventory').removeAttr('disabled');
                    $('#saveinventory').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveInventoryForm').find("input[type=text]").val("");
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Item have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveinventory').removeAttr('disabled');
                    $('#cancelinventory').removeAttr('disabled');
                    $('#saveinventory').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add Item at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveinventory').removeAttr('disabled');
                    $('#cancelinventory').removeAttr('disabled');
                    $('#saveinventory').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('SKU already exist');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            },
            error: function(err) {
                if (err.status == 422) {
                    $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<small style="color: red; position: absolute; width:100%; text-align: right; margin-left: -30px">' + error[0] + '</small>'));
                    });
                }
            }
        });

    });

    
    //Open sidebar to Update
    $(document).on('click', '.openDataSidebarForUpdate', function() {

        $('input[id="operation"]').val('update');
        lastOp = 'update';
        $('#dataSidebarLoader').show();
        $('._cl-bottom').hide();
        $('.pc-cartlist').hide();

        //Form ki id change kr de hai
        $('#saveInventoryForm').prop('id','updateInventoryForm');

        var id = $(this).attr('id');
        $('input[name="team_updating_id"]').val(id);
        if (!$('#saveInventoryForm input[name="_method"]').length) {
            $('#saveInventoryForm').append('<input name="_method" value="PUT" hidden />');
        }

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="compPicture" />');


        $.ajax({
            type: 'GET',
            url: '/inventory_data/' + id,
            success: function(response) {
                console.log(response);
                var response = JSON.parse(response);
                $('#dataSidebarLoader').hide();
                $('._cl-bottom').show();
                $('.pc-cartlist').show();
                $('#uploadedImg').remove();

                $('input[name="name"]').focus();
                $('input[name="name"]').val(response.info.name);
                $('input[name="name"]').blur();

                $('input[name="liter_capacity"]').focus();
                $('input[name="liter_capacity"]').val(response.info.liter_capacity);
                $('input[name="liter_capacity"]').blur();

                $('input[name="sku"]').focus();
                $('input[name="sku"]').val(response.info.sku);
                $('input[name="sku"]').blur();

                $('input[name="purchase_price"]').focus();
                $('input[name="purchase_price"]').val(response.info.purchase_price);
                $('input[name="purchase_price"]').blur();

                $('input[name="quantity"]').focus();
                $('input[name="quantity"]').val(response.info.quantity);
                $('input[name="quantity"]').blur();

                $('input[name="inventory_id"]').val(response.info.id);
                $('input[name="old_img"]').val(response.info.img);
                $('select[name="returnable"]').val(response.info.returnable).trigger('change');

                var imgUrl = response.base_url + response.info.img;
                $("#compPicture").attr("data-height", '100px');
                $("#compPicture").attr("data-default-file", imgUrl);
                $('#compPicture').dropify();

                $('#saveinventory').hide();
                $('#updateinventory').show();

            }
        });

        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
        
    });


    //Update
    $(document).on('click', '#updateinventory', function() {

        $('#updateinventory').attr('disabled', 'disabled');
        $('#updateinventory').text('Processing..');
        var ajaxUrl = "/inventory_update";
        $('#updateInventoryForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateInventoryForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchInventoryList();
                    $('#updateinventory').removeAttr('disabled');
                    $('#updateinventory').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Inventory have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update Inventory at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            },
            error: function(err) {
                if (err.status == 422) {
                    $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<small style="color: red; position: absolute; width:100%; text-align: right; margin-left: -30px">' + error[0] + '</small>'));
                    });
                }
            }
        });

    });


    //Delete Button
    $(document).on('click', '.deletebtn', function(){
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");
        var id = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: '/DeleteInventory',
            data: {
                _token: '{!! csrf_token() !!}',
                id: id
            },
            success: function(response) {
                if(JSON.parse(response) == "success"){
                    fetchInventoryList();

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Inventory deleted successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "failed"){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to delete inventory');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
                    
            }
        });
    });

});

function fetchInventoryList() {
    $.ajax({
        type: 'GET',
        url: '/GetInventoryList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="InventoryListTable" style="width:100%;"><thead><tr><th>ID</th><th>Name</th><th>Capacity</th><th>Price</th><th>Quantity</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#InventoryListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#InventoryListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['name'] + '</td><td>' + element['liter_capacity'] + '</td><td>' + element['purchase_price'] + '</td><td>' + element['quantity'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#InventoryListTable').DataTable();
        }
    });
}
