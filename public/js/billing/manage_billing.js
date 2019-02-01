$(document).ready(function(){

    var delivery_detail = "";
    var custom_rate_array = [];
    var asset_issaunce_array = [];
    var selected_predefined_array = [];
    var deposit_against_pro_array = [];
    var security_deposite_against_pro = false;

    var currentLayout = 'start_date';

    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
    });

    var segments = location.href.split('/');
    var action = segments[3];
    if(action == "select_customer"){
        fetchCustomersList();
    }else if(action == "create_account"){
        $('#example').DataTable();
        $('#example2').DataTable();
        //fetchAreasList();
    }else if(action == "manage_zone"){
        //fetchZoneList();
    }

    var ancCounter = 0;

    $('#v-pills-tab a').each(function(){
        if(ancCounter != 0){
            $(this).css('pointer-events', 'none');
        }
        ancCounter++;
    });

    $(document).on('click', '.saveCurrentData', function(){
        if(currentLayout == 'start_date'){
            if($('#start_date').val() == ""){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please enter start date.');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            currentLayout = 'sell_rate';
            $('#v-pills-tab a:eq(1)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(1)').addClass("active");
            $('#v-pills-01').removeClass('active show');
            $('#v-pills-02').addClass('active show');
        }else if(currentLayout == 'sell_rate'){
            //debugger;
            if($('#predefined').prop('checked')){
                if($('#predefined_products').val() == 0 || !$('#predefined_products').val()){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Please Select predefined rate.');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    return;
                }
                    currentLayout = 'apply_tax';
                    $('#v-pills-tab a:eq(2)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(2)').addClass("active");
                    $('#v-pills-02').removeClass('active show');
                    $('#v-pills-03').addClass('active show');

            }else{
                var reqlength = $('.new_rate').length;
                console.log(reqlength);
                var value = $('.new_rate').filter(function () {
                    return this.value != '';
                });
            
                if (value.length>=0 && (value.length !== reqlength)) {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Please add rate for all products.');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    return;
                } else {
                    currentLayout = 'apply_tax';
                    $('#v-pills-tab a:eq(2)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(2)').addClass("active");
                    $('#v-pills-02').removeClass('active show');
                    $('#v-pills-03').addClass('active show');
                }
               
            }
           
        }else if(currentLayout == 'apply_tax'){
           // debugger;
            if(!$('.apply_tax_yes').prop("checked") && !$('.apply_tax_no').prop("checked")){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please fill tax info');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }else{
                if($('.apply_tax_no').prop("checked")){
                    $('#apply_tax').hide();
                    //Yaha No save ho jay ga
                    currentLayout = 'membership_fee';
                    $('#v-pills-tab a:eq(3)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(3)').addClass("active");
                    $('#v-pills-03').removeClass('active show');
                    $('#v-pills-04').addClass('active show');
                }else{
                    if($('#gst_tax').val()==""){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Please GST amount.');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    }
                    currentLayout = 'membership_fee';
                    $('#v-pills-tab a:eq(3)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(3)').addClass("active");
                    $('#v-pills-03').removeClass('active show');
                    $('#v-pills-04').addClass('active show');
                    $('.tax_sidebar').text(numberWithCommas($('#gst_tax').val()));
                }
            }
            
           
        }else if(currentLayout == 'membership_fee'){
            if($('#membership_fee').val() == ""){4
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please enter membership fee.');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            currentLayout = 'security_deposit';
            $('#v-pills-tab a:eq(4)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(4)').addClass("active");
            $('#v-pills-04').removeClass('active show');
            $('#v-pills-05').addClass('active show');
            $('.membership_sidebar').text(numberWithCommas($('#membership_fee').val()));
           
        }else if(currentLayout == 'security_deposit'){
            //debugger;
            if(!$('#securitydeposit').prop("checked") && !$('#againstproducts').prop("checked")){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please enter security deposit');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }else{
                
                if($('#securitydeposit').prop("checked")){
                    if($('#flat_deposit_field').val() == ""){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Please fill flat deposit field');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    }
                    currentLayout = 'credit_limit';
                    $('#v-pills-tab a:eq(5)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(5)').addClass("active");
                    $('#v-pills-05').removeClass('active show');
                    $('#v-pills-06').addClass('active show');
                }else{
                    if(!security_deposite_against_pro){
                        if($('#select_products').val() == 0 || $('#product_quantity').val() == "" || $('#deposite').val() == ""){
                            $('#notifDiv').fadeIn();
                            $('#notifDiv').css('background', 'red');
                            $('#notifDiv').text('Please fill all fields');
                            setTimeout(() => {
                                $('#notifDiv').fadeOut();
                            }, 3000);
                            return;
                        }else if(!security_deposite_against_pro){
                            $('#notifDiv').fadeIn();
                            $('#notifDiv').css('background', 'red');
                            $('#notifDiv').text('First add any item');
                            setTimeout(() => {
                                $('#notifDiv').fadeOut();
                            }, 3000);
                            return;
                        }
                    }
                    currentLayout = 'credit_limit';
                    $('#v-pills-tab a:eq(5)').css("pointer-events", "");
                    $('#v-pills-tab a').removeClass("active");
                    $('#v-pills-tab a:eq(5)').addClass("active");
                    $('#v-pills-05').removeClass('active show');
                    $('#v-pills-06').addClass('active show');
                }
            } 
           
        }else if(currentLayout == 'credit_limit'){
            if($('#total_amount').val() == "" || $('#no_of_days').val() == ""){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please fill required fields');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            currentLayout = 'comsumption';
            $('#v-pills-tab a:eq(6)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(6)').addClass("active");
            $('#v-pills-06').removeClass('active show');
            $('#v-pills-07').addClass('active show');
            $('.total_amount_sidebar').text(numberWithCommas($('#total_amount').val()));
            $('.no_of_days_sidebar').text(numberWithCommas($('#no_of_days').val()));
           
        }else if(currentLayout == 'comsumption'){
            if($('#comsmuption').val() == ""){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please enter consmuption');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            currentLayout = 'delivery_details';
            $('#v-pills-tab a:eq(7)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(7)').addClass("active");
            $('#v-pills-07').removeClass('active show');
            $('#v-pills-08').addClass('active show');
            $('.consumption_sidebar').text(numberWithCommas($('#comsmuption').val()));
           
        }else if(currentLayout == 'delivery_details'){
            if(!$('#weekly').prop("checked") && !$('#biweekly').prop("checked") && !$('#monthly').prop("checked") || $('#select_days').val()==0){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please fill required fields');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            delivery_detail = $("input[name='txt-rate']:checked").val();

            currentLayout = 'assets_issuance';
            $('#v-pills-tab a:eq(8)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(8)').addClass("active");
            $('#v-pills-08').removeClass('active show');
            $('#v-pills-09').addClass('active show');
           
        }else if(currentLayout == 'assets_issuance'){
            if(!$('#assetsY').prop("checked") && !$('#assetsN').prop("checked")){
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please check asset Issuance');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }
            currentLayout = 'contract_copy';
            $('#v-pills-tab a:eq(9)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(9)').addClass("active");
            $('#v-pills-09').removeClass('active show');
            $('#v-pills-10').addClass('active show');
           
        }

    });

    $(document).on('click', '#customrate', function(){
        $('#custom_rate').show();
        $('#predefined_rate').hide();
        var type = $(this).val();
        //fetchassetdata();
        $('#dataSidebarLoader_rate').show();
        $.ajax({
            type: 'GET',
            url: '/GetInventoryListToAddCustomRate',
            data: {
                _token: '{!! csrf_token() !!}'
            },
            success: function(response) {
                //console.log(response);
                $('#dataSidebarLoader_rate').hide();
                $('.body_asset').empty();
                $('.body_asset').append('<table class="table table-hover dt-responsive nowrap" id="AssetListTable" style="width:100%;"><thead><tr><th>Product Name</th><th>Add Rate</th><th>Action</th></tr></thead><tbody></tbody></table>');
                $('#AssetListTable tbody').empty();
                var response = JSON.parse(response);
                response.forEach(element => {
                    $('#AssetListTable tbody').append('<tr><td>' + element['name'] + '</td><td><input type="number" value="" class="new_rate" style="max-width:50px;"/></td><td><button id="' + element['id'] + '" class="btn btn-default btn-line add_rate_to_asset">Add</button></td></tr>');
                });
                $('#tblLoader').hide();
                $('.body_asset').fadeIn();
                $('#AssetListTable').DataTable();
            }
        });
    });
    $(document).on('click', '#predefined', function(){
        $('#custom_rate').hide();
        $('#predefined_rate').show();
    });

    //this will apply custom rate to product against this user(Customer)
    $(document).on('click', '.add_rate_to_asset', function(){
        
        var rate = $(this).parent().parent().find('td:eq(1) .new_rate').val();
        if(rate == ""){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please enter rate.');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }
        var id = $(this).attr('id');
        var customer_id = segments[4];

        var prod_id_found = false;
        custom_rate_array.find(x => {
            //debugger;
            if(x.product_id == id){
                x.value = rate;
                prod_id_found = true;
                $(this).text('Added');
                setTimeout(() => {
                    $(this).text('Add');
                }, 1000);
                return;
            }
        });
        

        if(!prod_id_found){
            custom_rate_array.push({"customer_id": customer_id, "product_id": id, "value": rate});
            $(this).text('Added');
            setTimeout(() => {
                $(this).text('Add');
            }, 1000);
        }
        
         
        //console.log(custom_rate_array);
        //  return;
    });

    $(document).on('click', '.apply_tax_yes', function(){
        $('#apply_tax').show();
    });
    $(document).on('click', '.apply_tax_no', function(){
        $('#apply_tax').hide();
    });

    $(document).on('click', '.flat_deposit_btn', function(){
        $('#flat_deposit_div').show();
        $('#deposit_against_products_div').hide();
    });
    $(document).on('click', '.deposit_against_products', function(){
        $('#deposit_against_products_div').show();
        $('#flat_deposit_div').hide();
        $('#dataSidebarLoader_rate').show();
        //var products = $('#predefined_products').val();
        // $.ajax({
        //     type: 'GET',
        //     url: '/GetProductsForSecurityDeposite',
        //     data: {
        //         _token: '{!! csrf_token() !!}',
        //         products: products
        //     },
        //     success: function(response) {
        //         //console.log(response);
        //         $('#dataSidebarLoader_rate').hide();
        //         $('#select_products').empty();
        //         $('#select_products').append('<option value="0">Select</option>');
        //         var response = JSON.parse(response);
                
        //     }
        // });
    });
    $(document).on('change', '#product_quantity', function(){
        var purchase_price = $('#select_products').val();
        var current_quantity = $(this).val();
        var total = parseInt(purchase_price) * parseInt(current_quantity);
        $('#deposite').val(total);
    });
    $(document).on('click', '#save_security_data_against_pro', function(){
        if($('#select_products').val()==0 || $('#product_quantity').val()=="" || $('#deposite').val()==""){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please fill all fields (*).');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }
        var product = $('#select_products').find('option:selected').attr("name");
        var quantity = $('#product_quantity').val();
        var deposite = $('#deposite').val();
        var product_id = $('#select_products').find('option:selected').attr("class");
        //debugger;
        var prod_id_found = false;
        deposit_against_pro_array.find(x => {
            //debugger;
            if(x.product_id == product_id){
                x.quantity = quantity;
                x.deposite = deposite;
                prod_id_found = true;
                security_deposite_against_pro = true;
                $(this).text('Added');
                $('#product_quantity').val('');
                $('#deposite').val('');
                setTimeout(() => {
                    $(this).text('Add');
                }, 1000);
                return;
            }
        });

        if(!prod_id_found){
            deposit_against_pro_array.push({"product_id": product_id, "product": product, "quantity": quantity, "deposite": deposite});
            $(this).text('Added');
            $('#product_quantity').val('');
            $('#deposite').val('');
            setTimeout(() => {
                $(this).text('Add');
            }, 1000);
            security_deposite_against_pro = true;
        }
        //console.log(deposit_against_pro_array);

        if(deposit_against_pro_array != ""){
            $('#security_deposite_data').empty();
            deposit_against_pro_array.forEach(element => {
                $('#security_deposite_data').append('<div class="row m-0 mt-10 pl-0 alert alert-color" role="alert"><div class="col-md-5"><strong>Product:</strong> '+ element.product +' </div> <div class="col-md-3"><strong>Qty:</strong> '+ element.quantity +' </div><div class="col-md-4"><strong>Deposit:</strong> '+element.deposite +' </div><button id="'+ element.product_id +'" type="button" class="close alert_close delete_one_row" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span> </button></div>');
            });
        }
        
        // $('#security_deposite_data').append('<div class="row m-0 mt-10 pl-0 alert alert-color" role="alert"><div class="col-md-5"><strong>Product:</strong> '+ product +' </div> <div class="col-md-3"><strong>Qty:</strong> '+ quantity +' </div><div class="col-md-4"><strong>Deposit:</strong> '+ deposite +' </div><button type="button" class="close alert_close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span> </button></div>');

    });
    $(document).on('click', '.delete_one_row', function(){
        //debugger;
        var id = $(this).attr('id');
        deposit_against_pro_array.splice(deposit_against_pro_array.findIndex( x => x.product_id == id), 1);  
    });

    $(document).on('click', '#assetsY', function(){
        $('#asset_issaunace_div').show();
    });

    //Show assets list to Issue
    $(document).on('change', '#asset_type', function(){
        var type = $(this).val();
        //fetchassetdata();
        $('#dataSidebarLoader_asset').show();
        $.ajax({
            type: 'GET',
            url: '/GetAssestsListToIssue',
            data: {
                _token: '{!! csrf_token() !!}',
                type: type
            },
            success: function(response) {
                //console.log(response);
                $('#dataSidebarLoader_asset').hide();
                $('.body_asset_variant').empty();
                $('.body_asset_variant').append('<table class="table table-hover dt-responsive nowrap" id="AssetListTable" style="width:100%;"><thead><tr><th>QTY</th><th style="max-width:60px;">Model No</th><th style="max-width:60px;">Warrenty Start</th><th style="max-width:60px;">Purchase Price</th><th>Action</th></tr></thead><tbody></tbody></table>');
                $('#AssetListTable tbody').empty();
                var response = JSON.parse(response);
                response.forEach(element => {
                    $('#AssetListTable tbody').append('<tr><td>' + '001' + '</td><td>' + element['model_no'] + '</td><td>' + element['warrenty_start'] + '</td><td>' + element['purchase_price'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line issue_to_customer">Issue</button></td></tr>');
                });
                $('#tblLoader').hide();
                $('.body_asset_variant').fadeIn();
                $('#AssetListTable').DataTable();
            }
        });
    });

    //Issue to Customer
    $(document).on('click', '.issue_to_customer', function(){
        
        var asset_id = $(this).attr('id');
        var customer_id = segments[4];
       //$('.issue_to_customer').attr('disabled', 'disabled');
        //$(this).text('Issued');

        var prod_id_found = false;
        asset_issaunce_array.find(x => {
            //debugger;
            if(x.asset_id == asset_id){
                x.asset_id = asset_id;
                prod_id_found = true;
                $(this).text('Issued');
                setTimeout(() => {
                    $(this).text('Issue');
                }, 1000);
                return;
            }
        });
        
        if(!prod_id_found){
            asset_issaunce_array.push({"customer_id": customer_id, "asset_id": asset_id});
            $(this).text('Issued');
            setTimeout(() => {
                $(this).text('Issue');
            }, 1000);
        }
        console.log(asset_issaunce_array);


        // $.ajax({
        //     type: 'GET',
        //     url: '/IssueAssetToCustomer',
        //     data: {
        //         _token: '{!! csrf_token() !!}',
        //         asset_id: asset_id,
        //         customer_id: customer_id
        //     },
        //     success: function(response) {
        //         if(JSON.parse(response) == "success"){
        //             $('.issue_to_customer').removeAttr('disabled');
        //             $('.issue_to_customer').text('Issue');
        //             $('#notifDiv').fadeIn();
        //             $('#notifDiv').css('background', 'green');
        //             $('#notifDiv').text('Issued applied successfully');
        //             setTimeout(() => {
        //                 $('#notifDiv').fadeOut();
        //             }, 3000);
        //         }else{
        //             $('.issue_to_customer').removeAttr('disabled');
        //             $('.issue_to_customer').text('Issue');
        //             $('#notifDiv').fadeIn();
        //             $('#notifDiv').css('background', 'red');
        //             $('#notifDiv').text('Failed to issue asset');
        //             setTimeout(() => {
        //                 $('#notifDiv').fadeOut();
        //             }, 3000);
        //         }
        //     }
        // });
    });

    $(document).on('click', '#assetsN', function(){
        $('#asset_issaunace_div').hide();
    });

    $(document).on('click', '.saveWholeForm', function(){
        
        $('.saveWholeForm').attr('disabled', 'disabled');
        $(this).text('Processing..');

        var start_date = $('#start_date').val();
        var predefined_rates = $('#predefined_products').val();
        var gst_tax = $('#gst_tax').val();
        var membership_fee = $('#membership_fee').val();
        var flat_deposit_field = $('#flat_deposit_field').val();
        //var select_products = $('#select_products').val()+"";
        var select_products = deposit_against_pro_array;
        var product_quantity = $('#product_quantity').val();
        var product_price = $('#deposite').val();
        var total_amount = $('#total_amount').val();
        var no_of_days = $('#no_of_days').val();
        var comsmuption = $('#comsmuption').val();
        var delivery_detail_radio = delivery_detail;
        var select_days = $('#select_days').val()+"";
        var customer_id = segments[4];
        var documents = $('#documents').val();

        $('#dataSidebarLoader').show();

        $.ajax({
            type: 'GET',
            url: '/IssueBillingToCustomer',
            data: {
                _token: '{!! csrf_token() !!}',
                start_date: start_date,
                predefined_rates: predefined_rates,
                gst_tax: gst_tax,
                membership_fee: membership_fee,
                flat_deposit_field: flat_deposit_field,
                select_products: select_products,
                product_quantity: product_quantity,
                product_price: product_price,
                total_amount: total_amount,
                no_of_days: no_of_days,
                comsmuption: comsmuption,
                delivery_detail_radio: delivery_detail_radio,
                select_days: select_days,
                custom_rate_array: custom_rate_array,
                asset_issaunce_array: asset_issaunce_array,
                //documents: documents,
                customer_id: customer_id
            },
            success: function(response) {
                console.log(response);
                //return;
                if(JSON.parse(response) == "success"){
                    if(documents != ""){
                        $('#my-awesome-dropzone').ajaxSubmit({
                            type: "POST",
                            url: '/addDocumentBilling',
                            data: $('#my-awesome-dropzone').serialize(),
                            cache: false,
                            success: function(response) {
                                if(JSON.parse(response) == "success"){
                                    $('#dataSidebarLoader').hide();
                                    $('.saveWholeForm').removeAttr('disabled');
                                    $('.saveWholeForm').text('Save');
                                    $('#notifDiv').fadeIn();
                                    $('#notifDiv').css('background', 'green');
                                    $('#notifDiv').text('Successfully created');
                                    setTimeout(() => {
                                        $('#notifDiv').fadeOut();
                                    }, 3000);
                                    window.location.href='/select_customer';
                                }else{
                                    $('#dataSidebarLoader').hide();
                                    $('.saveWholeForm').removeAttr('disabled');
                                    $('.saveWholeForm').text('Save');
                                    $('#notifDiv').fadeIn();
                                    $('#notifDiv').css('background', 'red');
                                    $('#notifDiv').text('Unable to create billing account');
                                    setTimeout(() => {
                                        $('#notifDiv').fadeOut();
                                    }, 3000);
                                }
                            }
                        });
                    }else{
                        $('#dataSidebarLoader').hide();
                        $('.saveWholeForm').removeAttr('disabled');
                        $('.saveWholeForm').text('Save');
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Successfully created');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        window.location.href='/select_customer';
                    }
                }else{
                    $('#dataSidebarLoader').hide();
                    $('.saveWholeForm').removeAttr('disabled');
                    $('.saveWholeForm').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Unable to create billing account');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            }
        });
    });


    $(document).on('click', '.cancel_btn', function(){
       // debugger;
        if(currentLayout == 'contract_copy'){
            currentLayout = 'assets_issuance';
            $('#v-pills-tab a:eq(9)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(8)').addClass("active");
            $('#v-pills-10').removeClass('active show');
            $('#v-pills-09').addClass('active show');
        }else if(currentLayout == 'assets_issuance'){
            currentLayout = 'delivery_details';
            $('#v-pills-tab a:eq(8)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(7)').addClass("active");
            $('#v-pills-09').removeClass('active show');
            $('#v-pills-08').addClass('active show');
        }else if(currentLayout == 'delivery_details'){
            currentLayout = 'comsumption';
            $('#v-pills-tab a:eq(7)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(6)').addClass("active");
            $('#v-pills-08').removeClass('active show');
            $('#v-pills-07').addClass('active show');
        }else if(currentLayout == 'comsumption'){
            currentLayout = 'credit_limit';
            $('#v-pills-tab a:eq(6)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(5)').addClass("active");
            $('#v-pills-07').removeClass('active show');
            $('#v-pills-06').addClass('active show');
        }else if(currentLayout == 'credit_limit'){
            currentLayout = 'security_deposit';
            $('#v-pills-tab a:eq(5)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(4)').addClass("active");
            $('#v-pills-06').removeClass('active show');
            $('#v-pills-05').addClass('active show');
        }else if(currentLayout == 'security_deposit'){
            currentLayout = 'membership_fee';
            $('#v-pills-tab a:eq(4)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(3)').addClass("active");
            $('#v-pills-05').removeClass('active show');
            $('#v-pills-04').addClass('active show');
        }else if(currentLayout == 'membership_fee'){
            currentLayout = 'apply_tax';
            $('#v-pills-tab a:eq(3)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(2)').addClass("active");
            $('#v-pills-04').removeClass('active show');
            $('#v-pills-03').addClass('active show');
        }else if(currentLayout == 'apply_tax'){
            currentLayout = 'sell_rate';
            $('#v-pills-tab a:eq(2)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(1)').addClass("active");
            $('#v-pills-03').removeClass('active show');
            $('#v-pills-02').addClass('active show');
        }else if(currentLayout == 'sell_rate'){
           currentLayout = 'start_date';
            $('#v-pills-tab a:eq(0)').css("pointer-events", "");
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(0)').addClass("active");
            $('#v-pills-02').removeClass('active show');
            $('#v-pills-01').addClass('active show');
        }else if(currentLayout == 'start_date'){
            
        }
    });

    $(document).on('click', '.nav-link', function(){
        if($(this).text() == "Start Date"){
            currentLayout = 'start_date';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(0)').addClass("active");
        }else if($(this).text() == "Sell Rate"){
            currentLayout = 'sell_rate';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(1)').addClass("active");
        }else if($(this).text() == "Apply Tax Rate"){
            currentLayout = 'apply_tax';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(2)').addClass("active");
        }else if($(this).text() == "Membership Fee"){
            currentLayout = 'membership_fee';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(3)').addClass("active");
        }else if($(this).text() == "Security Deposit"){
            currentLayout = 'security_deposit';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(4)').addClass("active");
        }else if($(this).text() == "Credit Limit"){
            currentLayout = 'credit_limit';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(5)').addClass("active");
        }else if($(this).text() == "Consumption"){
            currentLayout = 'comsumption';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(6)').addClass("active");
        }else if($(this).text() == "Delivery Details"){
            currentLayout = 'delivery_details';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(7)').addClass("active");
        }else if($(this).text() == "Assets Issuance"){
            currentLayout = 'assets_issuance';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(8)').addClass("active");
        }else if($(this).text() == "Contract Copy"){
            currentLayout = 'contract_copy';
            $('#v-pills-tab a').removeClass("active");
            $('#v-pills-tab a:eq(9)').addClass("active");
        }
    });

});

function fetchCustomersList() {
    $.ajax({
        type: 'GET',
        url: '/GetCustomersListForBilling',
        success: function(response) {
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="companiesListTable" style="width:100%;"><thead><tr><th>ID</th><th>Customer Name</th><th>POC</th><th>Country</th><th>Customer Type</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#companiesListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#companiesListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['company_name'] + '</td><td>' + element['company_poc'] + '</td><td>' + element['country'] + '</td><td>' + (element['customer_type'] == "1" ? "Residential" : (element['customer_type'] == "2" ? "Corporate" : "Commercial")) + '</td><td><a href="/create_account/' + element['id'] +'"><button id="' + element['id'] + '" class="btn btn-default btn-line">Create Billing</button></a></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#companiesListTable').DataTable();
        }
    });
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}