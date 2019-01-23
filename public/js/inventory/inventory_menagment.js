//Dropzone.autoDiscover = false;
$(document).ready(function(){

    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
    });
    var segments = location.href.split('/');
    var action = segments[3];
    if(action == "inventory_list"){
        fetchInventoryList();
    }else if(action == "add-ons"){
        fetchAddOnsList();
    }else if(action == "stock_managment"){
        fetchStockList();
    }else if(action == "assests_management"){
        fetchAssestsList();
    }else if (action == "update_asset"){
        fetchAssestsToUpdateList();
    }

    var lastOp = "add";
    var client_id = "";
    $(document).on('click', '.openDataSidebarForAddingInventory', function() {
        //alert('here');
        if (lastOp == "update") {
           
            if(action == "inventory_list"){
                $('#updateInventoryForm').prop('id','saveInventoryForm');
                $('input[name="name"]').val("");
                $('input[name="name"]').blur();

                $('input[name="liter_capacity"]').val("");
                $('input[name="liter_capacity"]').blur();

                $('input[name="sku"]').val("");
                $('input[name="sku"]').blur();

                $('input[name="purchase_price"]').val("");
                $('input[name="purchase_price"]').blur();

                $('input[name="inventory_id"]').val("");
                $('input[name="old_img"]').val("");
                $('select[name="returnable"]').val(-1).trigger('change');
                
                $('#saveinventory').show();
                $('#updateinventory').hide();
            }else if(action == "add-ons"){
                $('#updateAddOnsForm').prop('id','saveAddOnsForm');

                $('input[name="name"]').val("");
                $('input[name="name"]').blur();

                $('input[name="purchase_price"]').val("");
                $('input[name="purchase_price"]').blur();

                $('input[name="quantity"]').val("");
                $('input[name="quantity"]').blur();

                $('#saveAddOns').show();
                $('#updateAddOns').hide();
            }else if(action == "assests_management"){

                $('.asset_core').show();
                $('.asset_detail').hide();

                $('input[name="name"]').val("");
                $('input[name="name"]').blur();

                $('select[name="asset_type"]').val(0).trigger('change');

                $('#saveAssests_core').show();
                $('#saveAssests_core').text('Save');
                $('#updateAssests').hide();
                $('#saveAssests').hide();
                $('#saveAssests_core').removeAttr('disabled');
            }   
           
        }
        $('#saveAssests_core').removeAttr('disabled');
        $('#saveAssests_core').show();
        $('#saveAssests_core').text('Save');
        $('#updateAssests').hide();
        $('#saveAssests').hide();

        $('.asset_core').show();
        $('.asset_detail').hide();
        lastOp = 'add';
        // if ($('#saveInventoryForm input[name="_method"]').length) {
        //     $('#saveInventoryForm input[name="_method"]').remove();
        // }
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

    $(document).on('click', '.openDataSidebarForAddingAssestDetail', function() {
        $('input[id="operation"]').val('add');

        $('.overlay').addClass('active');
        $('input[id="operation"]').val('add');
        //lastOp = 'add';
        $('#dataSidebarLoader').show();
        $('._cl-bottom').hide();
        $('.pc-cartlist').hide();
        $('#product-cl-sec').addClass('active');

        var id = $(this).attr('id');
        $("input[name='assests_id_for_detail']").val(id);
       
        $.ajax({
            type: 'GET',
            url: '/asset_detail/' + id,
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                var response = JSON.parse(response);
                $('.asset_core').hide();
                $('.asset_detail').show();
        
                $('#dataSidebarLoader').hide();
                $('._cl-bottom').show();
                $('.pc-cartlist').show();

                $('input[name="name"]').focus();
                $('input[name="name"]').val(response.info.name);
                $('input[name="name"]').blur();

                  if (lastOp == "update") {
                    $('#updateAssestsForm').prop('id','saveAssestsForm');

                    $('input[name="sku"]').val("");
                    $('input[name="sku"]').blur();

                    $('input[name="model"]').val("");
                    $('input[name="model"]').blur();

                    $('input[name="serial_no"]').val("");
                    $('input[name="serial_no"]').blur();

                    $('input[name="purchase_price"]').val("");
                    $('input[name="purchase_price"]').blur();

                    $('input[name="seller"]').val("");
                    $('input[name="seller"]').blur();

                    $('input[name="warrenty_start"]').val("");
                    $('input[name="warrenty_start"]').blur();

                    $('input[name="warrenty_end"]').val("");
                    $('input[name="warrenty_end"]').blur();

                    $('input[name="manufactures"]').val("");
                    $('input[name="manufactures"]').blur();

                    $('input[name="invoices"]').val(null);
                    $('input[name="documents"]').val(null);

                    $('#saveAssests').show();
                    $('#saveAssests').text('Save');
                    $('#updateAssests').hide();
                    $('#saveAssests').removeAttr('disabled');
                
                }
                
                $('#saveAssests').removeAttr('disabled');
                $('#saveAssests_core').hide();
                $('#updateAssests').hide();
                $('#saveAssests').show();
                $('#saveAssests').text('Save');
                lastOp = 'add';
                
                // $('input[id="operation"]').val('add');
                // $('#product-cl-sec').addClass('active');
                // $('.overlay').addClass('active');
                // $('.collapse.in').toggleClass('in');
                // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
                // $('body').toggleClass('no-scroll');
            }
        });
    });


    //save
    $(document).on('click', '#saveinventory', function() {

        if (!$('input[name="name"]').val() || !$('input[name="liter_capacity"]').val() || !$('input[name="sku"]').val()
            || !$('input[name="purchase_price"]').val() || !$('select[name="returnable"]').val()) {
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

        var ajaxUrl = "/add_inventory";

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
                    // if ($('#operation').val() !== "update") {
                    //     $('#saveInventoryForm').find("input[type=text]").val("");
                    // }
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Item have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    // $('#saveInventoryForm').find('name').val('');
                    // $('#saveInventoryForm').find('liter_capacity').val('');
                    // $('#saveInventoryForm').find('sku').val('');
                    // $('#saveInventoryForm').find('purchase_price').val('');
                    // $('#saveInventoryForm').find('returnable').val(0).trigger('change');
                    // $('#dropifyImgDiv').empty();
                    // $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="compPicture" />');
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

    $(document).on('click', '#saveAddOns', function() {

        if (!$('input[name="name"]').val() || !$('input[name="purchase_price"]').val() || !$('input[name="quantity"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveAddOns').attr('disabled', 'disabled');
        $('#cancelAddOns').attr('disabled', 'disabled');
        $('#saveAddOns').text('Processing..');

        var ajaxUrl = "/add_addOns";

        $('#saveAddOnsForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveAddOnsForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                //return;
                if (JSON.parse(response) == "success") {
                    fetchAddOnsList();
                    $('#saveAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#saveAddOns').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Information have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    //$('#saveAddOnsForm').find("input").val('');
                } else if(JSON.parse(response) == "failed"){
                    $('#saveAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#saveAddOns').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add information at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#saveAddOns').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('This information already exist');
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

    $(document).on('click', '#saveAssests_core', function(){
        if (!$('input[name="name_core"]').val() || !$('select[name="asset_type"]').val() || $('select[name="asset_type"]').val() == 0) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveAssests_core').attr('disabled', 'disabled');
        $('#updateAssests').attr('disabled', 'disabled');
        $('#saveAssests_core').text('Processing..');

        var ajaxUrl = "/add_assests_core";

        $('#saveAssestsForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveAssestsForm').serialize(),
            cache: false,
            success: function(response) {
                var response = JSON.parse(response);
                //console.log(response);
                if(response == 'success'){
                    fetchAssestsList();
                    $('#saveAssests_core').removeAttr('disabled');
                    $('#updateAssests').removeAttr('disabled');
                    $('#saveAssests_core').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Assest have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    $('input[name = "name_core"]').val('');
                    $('input[name = "asset_type"]').val(0).trigger('change');
                }else if(response == 'already exist'){
                    $('#saveAssests_core').removeAttr('disabled');
                    $('#updateAssests').removeAttr('disabled');
                    $('#saveAssests_core').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Asset already exist');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else{
                     $('#saveAssests_core').removeAttr('disabled');
                    $('#updateAssests').removeAttr('disabled');
                    $('#saveAssests_core').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add Information at the moment');
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

    $(document).on('click', '#saveAssests', function() {

        if (!$('input[name="name"]').val() || !$('input[name="purchase_price"]').val() || !$('input[name="serial_no"]').val() ||
            !$('input[name="seller"]').val() || !$('input[name="model"]').val() || !$('input[name="warrenty_start"]').val() || 
            !$('input[name="warrenty_end"]').val() || !$('input[name="manufactures"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveAssests').attr('disabled', 'disabled');
        $('#updateAssests').attr('disabled', 'disabled');
        $('#saveAssests').text('Processing..');

        var ajaxUrl = "/add_assests";

        $('#saveAssestsForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveAssestsForm').serialize(),
            cache: false,
            success: function(response) {
                var response = JSON.parse(response);
                //console.log(response);
                response.forEach(element => { 
                    if(element.pic || element.invoice || element.doc || element.asset){
                        fetchAssestsList();
                        $('#saveAssests').removeAttr('disabled');
                        $('#updateAssests').removeAttr('disabled');
                        $('#saveAssests').text('Save');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Assest have been added successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        $('input[name = "name"]').val('');
                        $('input[name = "serial_no"]').val('');
                        $('input[name = "model"]').val('');
                        $('input[name = "manufactures"]').val('');
                        $('input[name = "purchase_price"]').val('');
                        $('input[name = "seller"]').val('');
                        $('input[name = "warrenty_start"]').val('');
                        $('input[name = "warrenty_end"]').val('');
                        $('input[name = "documents"]').val(null);
                        $('input[name = "invoices"]').val(null);
                        $('input[name = "pictures"]').val(null);
                    }else{
                        $('#saveAssests').removeAttr('disabled');
                        $('#updateAssests').removeAttr('disabled');
                        $('#saveAssests').text('Save');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Failed to add Information at the moment');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }
                });
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

        if(action == "inventory_list"){
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
                    //console.log(response);
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
        }else if(action == "add-ons"){
            //Form ki id change kr de hai
            $('#saveAddOnsForm').prop('id','updateAddOnsForm');

            var id = $(this).attr('id');
            $('input[name="team_updating_id"]').val(id);
            if (!$('#saveAddOnsForm input[name="_method"]').length) {
                $('#saveAddOnsForm').append('<input name="_method" value="PUT" hidden />');
            }

            $.ajax({
                type: 'GET',
                url: '/add_ons_data/' + id,
                success: function(response) {
                   // console.log(response);
                    var response = JSON.parse(response);
                    $('#dataSidebarLoader').hide();
                    $('._cl-bottom').show();
                    $('.pc-cartlist').show();
                    $('#uploadedImg').remove();

                    $('input[name="name"]').focus();
                    $('input[name="name"]').val(response.info.name);
                    $('input[name="name"]').blur();

                    $('input[name="purchase_price"]').focus();
                    $('input[name="purchase_price"]').val(response.info.purchase_price);
                    $('input[name="purchase_price"]').blur();

                    $('input[name="quantity"]').focus();
                    $('input[name="quantity"]').val(response.info.quantity);
                    $('input[name="quantity"]').blur();

                    $('input[name="addOns_id"]').val(response.info.id);

                    $('#saveAddOns').hide();
                    $('#updateAddOns').show();

                }
            });

            $('#product-cl-sec').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            $('body').toggleClass('no-scroll');
        }else if(action == "update_asset"){
            //Form ki id change kr de hai
            //$('#saveAssestsForm').prop('id','updateAssestsForm');

            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/assests_data/' + id,
                success: function(response) {
                    console.log(response);
                    var response = JSON.parse(response);
                    $('.asset_core').hide();
                    $('.asset_detail').show();

                    $('#updateAssestsForm').find('name').removeAttr('disabled');
                    
                    if(response.info == null){
                        $('#pl-close').click();
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('This asset is empty.');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else{
                        $('#saveAssests_core').hide();
                        $('#saveAssests').hide();

                        $('#dataSidebarLoader').hide();
                        $('._cl-bottom').show();
                        $('.pc-cartlist').show();
                        $('#uploadedImg').remove();
    
                        $('input[name="purchase_price"]').focus();
                        $('input[name="purchase_price"]').val(response.info.purchase_price);
                        $('input[name="purchase_price"]').blur();
    
                        $('input[name="name"]').focus();
                        $('input[name="name"]').val(response.info.name);
                        $('input[name="name"]').blur();
    
                        $('input[name="model"]').focus();
                        $('input[name="model"]').val(response.info.model_no);
                        $('input[name="model"]').blur();
    
                        $('input[name="serial_no"]').focus();
                        $('input[name="serial_no"]').val(response.info.serial_no);
                        $('input[name="serial_no"]').blur();
    
                        $('input[name="seller"]').focus();
                        $('input[name="seller"]').val(response.info.seller);
                        $('input[name="seller"]').blur();
    
                        $('input[name="manufactures"]').focus();
                        $('input[name="manufactures"]').val(response.info.manufacture);
                        $('input[name="manufactures"]').blur();
    
                        $('input[name="asset_id_to_updateAsset"]').val(response.info.id);
                        
                        $('#date_picker_start').datepicker({dateFormat: 'yy-mm-dd'});
                        $('#date_picker_start').datepicker('setDate', new Date(response.info.warrenty_start));

                        $('#date_picker_end').datepicker({dateFormat: 'yy-mm-dd'});
                        $('#date_picker_end').datepicker('setDate', new Date(response.info.warrenty_end));
    
                        $('#saveAssests').hide();
                        $('#updateAssests').show();
                    }

                }
            });

            $('#product-cl-sec').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            $('body').toggleClass('no-scroll');
        }
        
    });



    //Update
    $(document).on('click', '#updateinventory', function() {

        $('#updateinventory').attr('disabled', 'disabled');
        $('#cancelinventory').attr('disabled', 'disabled');
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
                    $('#cancelinventory').removeAttr('disabled');
                    $('#updateinventory').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Inventory have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#updateinventory').removeAttr('disabled');
                    $('#cancelinventory').removeAttr('disabled');
                    $('#updateinventory').text('Update');
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

    $(document).on('click', '#updateAddOns', function() {

        $('#updateAddOns').attr('disabled', 'disabled');
        $('#cancelAddOns').attr('disabled', 'disabled');
        $('#updateAddOns').text('Processing..');
        var ajaxUrl = "/addOns_update";
        $('#updateAddOnsForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateAddOnsForm').serialize(),
            cache: false,
            success: function(response) {
                console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchAddOnsList();
                    $('#updateAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#updateAddOns').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Information have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#updateAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#updateAddOns').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update information at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#updateAddOns').removeAttr('disabled');
                    $('#cancelAddOns').removeAttr('disabled');
                    $('#updateAddOns').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('This information already exist in record');
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

    $(document).on('click', '#updateasset', function() {

        $('#updateasset').attr('disabled', 'disabled');
        $('#cancelasset').attr('disabled', 'disabled');
        $('#updateasset').text('Processing..');
        // alert('here');
        // return;
        var ajaxUrl = "/assests_update";
        $('#updateAssetForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateAssetForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchAssestsToUpdateList();
                    $('#updateasset').removeAttr('disabled');
                    $('#cancelasset').removeAttr('disabled');
                    $('#updateasset').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Information have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#updateasset').removeAttr('disabled');
                    $('#cancelasset').removeAttr('disabled');
                    $('#updateasset').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update information at the moment');
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
        if(action == "add-ons"){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/DeleteAddOns',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id
                },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchAddOnsList();

                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Information deleted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to delete information');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }     
                }
            });
        }else if(action == "update_asset"){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/DeleteAssests',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id
                },
                success: function(response) {
                    var response = JSON.parse(response);
                    response.forEach(element => { 
                        if(element.pic || element.invoice || element.doc || element.asset){
                            fetchAssestsToUpdateList();
                            $('#saveAssests').removeAttr('disabled');
                            $('#updateAssests').removeAttr('disabled');
                            $('#saveAssests').text('Delete');
                            $('#notifDiv').fadeIn();
                            $('#notifDiv').css('background', 'green');
                            $('#notifDiv').text('Assest deleted successfully');
                            setTimeout(() => {
                                $('#notifDiv').fadeOut();
                            }, 3000);
                        $('#saveAssestsForm').find("input").val('');
                        }else{
                            $('#saveAssests').removeAttr('disabled');
                            $('#updateAssests').removeAttr('disabled');
                            $('#saveAssests').text('Delete');
                            $('#notifDiv').fadeIn();
                            $('#notifDiv').css('background', 'red');
                            $('#notifDiv').text('Failed to delete at the moment');
                            setTimeout(() => {
                                $('#notifDiv').fadeOut();
                            }, 3000);
                        }
                    });
                }
            });
        }
        
    });

    //Activate button
    $(document).on('click', '.activate_btn', function(){
        var id = $(this).attr('id');
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");

        $.ajax({
            type: 'GET',
            url: '/activate_inventory',
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                if(JSON.parse(response) == "success"){
                    fetchInventoryList();
                    $(this).removeAttr('disabled');
                    $(this).text('Deactivate');
                    $(this).removeClass("activate_btn");
                    $(this).addClass("deactivate_btn");

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Activated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "failed"){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to activate inventory');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }    
            }
        });
    });

    $(document).on('click', '.deactivate_btn', function(){
        var id = $(this).attr('id');
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");

        $.ajax({
            type: 'GET',
            url: '/deactivate_inventory',
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                if(JSON.parse(response) == "success"){
                    fetchInventoryList();
                    $(this).removeAttr('disabled');
                    $(this).text('Deactivate');
                    $(this).removeClass("deactivate_btn");
                    $(this).addClass("activate_btn");

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Deactivated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "failed"){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to deactivate inventory');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }    
            }
        });
    });

    //Add Quantity
    $(document).on('click', '.add_quantity', function(){
        var id = $(this).attr('id');
        var sku = $(this).parent().parent().find('td:eq(1) #sku_quantity').text();
        var quantity = $(this).parent().parent().find('td:eq(3) #new_quantity').val();
        //alert(quantity);
        if(!quantity == ""){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            $.ajax({
                type: 'GET',
                url: '/Add_quantity_stock_managment',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id,
                    sku: sku,
                    quantity: quantity
                },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchStockList();
                        $('.add_quantiyt').text('Add Quantity');
                        $('.add_quantiyt').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Quantity added successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('.add_quantiyt').text('Add Quantity');
                        $('.add_quantiyt').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to add quantity');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }     
                }
            });
        }else{
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please enter quantity');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
        }
        
    });

    //Remove Quantity
    $(document).on('click', '.remove_quantity', function(){
        var id = $(this).attr('id');
        var sku = $(this).parent().parent().find('td:eq(1) #sku_quantity').text();
        var quantity = $(this).parent().parent().find('td:eq(3) #new_quantity').val();
        if(!quantity == ""){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            $.ajax({
                type: 'GET',
                url: '/Remove_quantity_stock_managment',
                data: {
                    _token: '{!! csrf_token() !!}',
                    id: id,
                    sku: sku,
                    quantity: quantity
                },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchStockList();
                        $('.remove_quantity').text('Remove Quantity');
                        $('.remove_quantity').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Quantity subtracted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('.remove_quantity').text('Remove Quantity');
                        $('.remove_quantity').removeAttr('disabled');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to subtract quantity');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }     
                }
            });
        }else{
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please enter quantity');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
        }
        
    });

});

function fetchInventoryList() {
    $.ajax({
        type: 'GET',
        url: '/GetInventoryList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="InventoryListTable" style="width:100%;"><thead><tr><th>ID</th><th>Name</th><th>Capacity</th><th>Price</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#InventoryListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#InventoryListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['name'] + '</td><td>' + element['liter_capacity'] + '</td><td>' + element['purchase_price'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate">Edit</button>' + (element["is_active"] ? '<button id="' + element['id'] + '" class="btn btn-default red-bg  deactivate_btn" title="View Detail">Deactivate</button>' : '<button id="' + element['id'] + '" class="btn btn-default activate_btn">Activate</button>') + '</td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#InventoryListTable').DataTable();
        }
    });
}

function fetchAddOnsList() {
    $.ajax({
        type: 'GET',
        url: '/GetAddOnsList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="AddOnsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#AddOnsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#AddOnsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['name'] + '</td><td>' + element['purchase_price'] + '</td><td>' + element['quantity'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#AddOnsListTable').DataTable();
        }
    });
}

function fetchStockList() {
    $.ajax({
        type: 'GET',
        url: '/GetStocQuantitykList',
        success: function(response) {
            console.log(response);
            //return;
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="StockListTable" style="width:100%;"><thead><tr><th>ID</th><th>SKU</th><th>Quantity</th><th>Add Quantity</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#StockListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#StockListTable tbody').append('<tr><td>' + element['id'] + '</td><td><span id = "sku_quantity">' + element['sku'] + '</span></td><td>' + element['quantity'] + '</td><td><input type="text" value="" id="new_quantity"/></td><td><button id="' + element['id'] + '" class="btn btn-default btn-line add_quantity">Add Quantity</button><button id="' + element['id'] + '" class="btn btn-default btn-line red-bg remove_quantity">Remove Quantity</button></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#StockListTable').DataTable();
        }
    });
}

function fetchAssestsList() {
    $.ajax({
        type: 'GET',
        url: '/GetAssestsList',
        success: function(response) {
            //console.log(response);
            
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="AddOnsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Assests Name</th><th>Issue Qty.</th><th>Current Qty.</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#AddOnsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#AddOnsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['name'] + '</td><td>' + element['quantity'] + '</td><td>' + element['total_qty'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForAddingAssestDetail">Add New</button><a href="/update_asset/'+ element['id'] +'"><button id="' + element['id'] + '" class="btn btn-default btn-line ">Update</button></a></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#AddOnsListTable').DataTable();
        }
    });
}

function fetchAssestsToUpdateList() {
    var id = $('#asset_id').val();
    $.ajax({
        type: 'GET',
        url: '/GetAssestsToUpdateList',
        data: {
            _token: '{!! csrf_token() !!}',
            id: id
        },
        success: function(response) {
            //console.log(response);
            
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="AddOnsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Serial NO.</th><th>Manufacturer</th><th>Warrent Start</th><th>Warrent End</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#AddOnsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#AddOnsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['serial_no'] + '</td><td>' + element['manufacture'] + '</td><td>' + element['warrenty_start'] + '</td><td>' + element['warrenty_end'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate">Update</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#AddOnsListTable').DataTable();
        }
    });
}
