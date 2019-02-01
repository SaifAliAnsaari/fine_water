$(document).ready(function() {

    var segments = location.href.split('/');
    var action = segments[3];

    if(action == "Customer_zone_list"){
        fetchZoneList();
    }else if (action !== 'CustomerProfile' && action !== 'Customer_zone_list'){
    //alert('here');
        fetchCompaniesList();
    }else {
        fetchCompanyInfoForUpdate($('#companyIdForUpdate').val());
    }
    var lastOp = "add";

    $(document).on('click', '.viewOnMap', function() {
        initMap($(this).attr('id').split(',')[0], $(this).attr('id').split(',')[1]);
    });

    $('input[name="jobTitle"]').parent().parent().hide();
    $('input[name="orgName"]').parent().parent().hide();
    $('input[name="faxPh"]').parent().parent().hide();
    $('input[name="strn"]').parent().parent().hide();
    $('input[name="ntn"]').parent().parent().hide();
    $('input[name="merchantName"]').parent().parent().hide();
    $('select[name="merchant_type"]').parent().parent().hide();
    $('input[name="faxPh"]').parent().parent().hide();
    $('input[name="strn"]').parent().parent().hide();
    $('input[name="ntn"]').parent().parent().hide();

    $('input[name="compName"]').parent().parent().fadeIn();
    $('input[name="homePh"]').parent().parent().fadeIn();
    $('input[name="cnic"]').parent().parent().fadeIn();

    $('select[name="type"]').change(function() {
        if ($(this).val() == "1") {

            $('input[name="jobTitle"]').parent().parent().hide();
            $('input[name="orgName"]').parent().parent().hide();
            $('input[name="faxPh"]').parent().parent().hide();
            $('input[name="strn"]').parent().parent().hide();
            $('input[name="ntn"]').parent().parent().hide();
            $('input[name="merchantName"]').parent().parent().hide();
            $('select[name="merchant_type"]').parent().parent().hide();
            $('input[name="faxPh"]').parent().parent().hide();
            $('input[name="strn"]').parent().parent().hide();
            $('input[name="ntn"]').parent().parent().hide();

            $('input[name="compName"]').parent().parent().fadeIn();
            $('input[name="homePh"]').parent().parent().fadeIn();
            $('input[name="cnic"]').parent().parent().fadeIn();
        } else if ($(this).val() == "2") {

            $('input[name="compName"]').parent().parent().hide();
            $('input[name="homePh"]').parent().parent().hide();
            $('input[name="cnic"]').parent().parent().hide();
            $('input[name="merchantName"]').parent().parent().hide();
            $('select[name="merchant_type"]').parent().parent().hide();
            $('input[name="faxPh"]').parent().parent().hide();
            $('input[name="strn"]').parent().parent().hide();
            $('input[name="ntn"]').parent().parent().hide();

            $('input[name="orgName"]').parent().parent().fadeIn();
            $('input[name="faxPh"]').parent().parent().fadeIn();
            $('input[name="strn"]').parent().parent().fadeIn();
            $('input[name="ntn"]').parent().parent().fadeIn();
            $('input[name="jobTitle"]').parent().parent().fadeIn();

        } else {

            $('input[name="compName"]').parent().parent().hide();
            $('input[name="homePh"]').parent().parent().hide();
            $('input[name="cnic"]').parent().parent().hide();
            $('input[name="orgName"]').parent().parent().hide();
            $('input[name="faxPh"]').parent().parent().hide();
            $('input[name="strn"]').parent().parent().hide();
            $('input[name="ntn"]').parent().parent().hide();

            $('input[name="merchantName"]').parent().parent().fadeIn();
            $('select[name="merchant_type"]').parent().parent().fadeIn();
            $('input[name="faxPh"]').parent().parent().fadeIn();
            $('input[name="strn"]').parent().parent().fadeIn();
            $('input[name="ntn"]').parent().parent().fadeIn();
            $('input[name="jobTitle"]').parent().parent().fadeIn();
        }
    });

    $(document).on('click', '.openDataSidebarForAddingCustomer', function() {
        if (lastOp == "update") {
            $('input[name="compName"]').val("");
            $('input[name="compName"]').blur();
            $('input[name="compName"]').val("");
            $('input[name="compName"]').blur();
            $('input[name="poc"]').val("");
            $('input[name="poc"]').blur();
            $('input[name="jobTitle"]').val("");
            $('input[name="jobTitle"]').blur();
            $('input[name="businessPh"]').val("");
            $('input[name="businessPh"]').blur();
            $('input[name="homePh"]').val("");
            $('input[name="homePh"]').blur();
            $('input[name="mobPh"]').val("");
            $('input[name="mobPh"]').blur();
            $('input[name="whatsappPh"]').val("");
            $('input[name="whatsappPh"]').blur();
            $('input[name="faxPh"]').val("");
            $('input[name="faxPh"]').blur();
            $('input[name="address"]').val("");
            $('input[name="address"]').blur();
            $('input[name="city"]').val("Karachi");
            $('input[name="state"]').val("Sindh");
            // $('input[name="region"]').val("");
            // $('input[name="region"]').blur();
            $('input[name="email"]').val("");
            $('input[name="email"]').blur();
            $('input[name="webpage"]').val("");
            $('input[name="webpage"]').blur();
            $('input[name="orgName"]').val("");
            $('input[name="orgName"]').blur();
            $('input[name="merchantName"]').val("");
            $('input[name="merchantName"]').blur();
            $('input[name="cnic"]').val("");
            $('input[name="cnic"]').blur();
            $('input[name="strn"]').val("");
            $('input[name="strn"]').blur();
            $('input[name="ntn"]').val("");
            $('input[name="ntn"]').blur();
            $('input[name="latitude"]').val("");
            $('input[name="latitude"]').blur();
            $('input[name="longitude"]').val("");
            $('input[name="longitude"]').blur();
            // $('input[name="day_of_delivery"]').val("");
            // $('input[name="day_of_delivery"]').blur();
            // $('input[name="bottles_per_week"]').val("");
            // $('input[name="bottles_per_week"]').blur();
            $('textarea[name="description"]').val("");

            $('select[name="type"]').val(1).trigger('change');
            $('select[name="zone"]').val(1).trigger('change');
            $('select[name="merchant_type"]').val(0).trigger('change');
            $('select[name="country"]').val('pakistan').trigger('change');
            //$('select[name="delivery"]').val(0).trigger('change');
            //$('select[name="customer_acquisition_source"]').val(0).trigger('change');
            //$('#saveCustomerForm').find("select").val("0").trigger('change');
            //$('select[name="deliveryPorts"], select[name="documentTypes"]').val("").trigger('change');
        }
        lastOp = 'add';
        if ($('#saveCustomerForm input[name="_method"]').length) {
            $('#saveCustomerForm input[name="_method"]').remove();
        }
        $('input[id="operation"]').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="companyPic" class="dropify" />');
        $('#companyPic').dropify();
    });

    $(document).on('click', '.openDataSidebarForUpdateCustomer', function() {
        $('input[id="operation"]').val('update');
        lastOp = 'update';
        $('#dataSidebarLoader').show();
        $('._cl-bottom').hide();
        $('.pc-cartlist').hide();

        var id = $(this).attr('id');
        $('input[name="product_updating_id"]').val(id)
        if (!$('#saveCustomerForm input[name="_method"]').length) {
            $('#saveCustomerForm').append('<input name="_method" value="PUT" hidden />');
        }

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="companyPic" class="dropify" />');
        $.ajax({
            type: 'GET',
            url: '/Customer/' + id,
            success: function(response) {
                var response = JSON.parse(response);
               // console.log(response);
                $('#dataSidebarLoader').hide();
                $('._cl-bottom').show();
                $('.pc-cartlist').show();
                $('#uploadedImg').remove();

                if ($('select[name="type"]').val() == "1") {

                    $('input[name="jobTitle"]').parent().parent().hide();
                    $('input[name="orgName"]').parent().parent().hide();
                    $('input[name="faxPh"]').parent().parent().hide();
                    $('input[name="strn"]').parent().parent().hide();
                    $('input[name="ntn"]').parent().parent().hide();
                    $('input[name="merchantName"]').parent().parent().hide();
                    $('select[name="merchant_type"]').parent().parent().hide();
                    $('input[name="faxPh"]').parent().parent().hide();
                    $('input[name="strn"]').parent().parent().hide();
                    $('input[name="ntn"]').parent().parent().hide();

                    $('input[name="compName"]').parent().parent().fadeIn();
                    $('input[name="homePh"]').parent().parent().fadeIn();
                    $('input[name="cnic"]').parent().parent().fadeIn();

                } else if ($('select[name="type"]').val() == "2") {

                    $('input[name="compName"]').parent().parent().hide();
                    $('input[name="homePh"]').parent().parent().hide();
                    $('input[name="cnic"]').parent().parent().hide();
                    $('input[name="merchantName"]').parent().parent().hide();
                    $('select[name="merchant_type"]').parent().parent().hide();
                    $('input[name="faxPh"]').parent().parent().hide();
                    $('input[name="strn"]').parent().parent().hide();
                    $('input[name="ntn"]').parent().parent().hide();

                    $('input[name="orgName"]').parent().parent().fadeIn();
                    $('input[name="faxPh"]').parent().parent().fadeIn();
                    $('input[name="strn"]').parent().parent().fadeIn();
                    $('input[name="ntn"]').parent().parent().fadeIn();
                    $('input[name="jobTitle"]').parent().parent().fadeIn();

                } else {

                    $('input[name="compName"]').parent().parent().hide();
                    $('input[name="homePh"]').parent().parent().hide();
                    $('input[name="cnic"]').parent().parent().hide();
                    $('input[name="orgName"]').parent().parent().hide();
                    $('input[name="faxPh"]').parent().parent().hide();
                    $('input[name="strn"]').parent().parent().hide();
                    $('input[name="ntn"]').parent().parent().hide();

                    $('input[name="merchantName"]').parent().parent().fadeIn();
                    $('select[name="merchant_type"]').parent().parent().fadeIn();
                    $('input[name="faxPh"]').parent().parent().fadeIn();
                    $('input[name="strn"]').parent().parent().fadeIn();
                    $('input[name="ntn"]').parent().parent().fadeIn();
                    $('input[name="jobTitle"]').parent().parent().fadeIn();
                }

                $('input[name="compName"]').focus();
                $('input[name="compName"]').val(response.info.company_name);
                $('input[name="compName"]').blur();

                $('input[name="orgName"]').focus();
                $('input[name="orgName"]').val(response.info.organization_name);
                $('input[name="orgName"]').blur();

                $('input[name="poc"]').focus();
                $('input[name="poc"]').val(response.info.company_poc);
                $('input[name="poc"]').blur();

                $('input[name="jobTitle"]').focus();
                $('input[name="jobTitle"]').val(response.info.job_title);
                $('input[name="jobTitle"]').blur();

                $('input[name="businessPh"]').focus();
                $('input[name="businessPh"]').val(response.info.business_phone);
                $('input[name="businessPh"]').blur();

                $('input[name="homePh"]').focus();
                $('input[name="homePh"]').val(response.info.home_phone);
                $('input[name="homePh"]').blur();

                $('input[name="mobPh"]').focus();
                $('input[name="mobPh"]').val(response.info.mobile_phone);
                $('input[name="mobPh"]').blur();

                $('input[name="whatsappPh"]').focus();
                $('input[name="whatsappPh"]').val(response.info.whatsapp_phone);
                $('input[name="whatsappPh"]').blur();

                $('input[name="faxPh"]').focus();
                $('input[name="faxPh"]').val(response.info.fax_number);
                $('input[name="faxPh"]').blur();

                $('input[name="address"]').focus();
                $('input[name="address"]').val(response.info.address);
                $('input[name="address"]').blur();

                $('input[name="city"]').focus();
                $('input[name="city"]').val(response.info.city);
                $('input[name="city"]').blur();

                $('input[name="state"]').focus();
                $('input[name="state"]').val(response.info.state);
                $('input[name="state"]').blur();

                // $('input[name="region"]').focus();
                // $('input[name="region"]').val(response.info.region);
                // $('input[name="region"]').blur();

                $('input[name="email"]').focus();
                $('input[name="email"]').val(response.info.email);
                $('input[name="email"]').blur();

                $('input[name="webpage"]').focus();
                $('input[name="webpage"]').val(response.info.webpage);
                $('input[name="webpage"]').blur();

                // $('input[name="bottles_per_week"]').focus();
                // $('input[name="bottles_per_week"]').val(response.info.bottles_per_week);
                // $('input[name="bottles_per_week"]').blur();

                $('input[name="cnic"]').focus();
                $('input[name="cnic"]').val(response.info.cnic);
                $('input[name="cnic"]').blur();

                // $('input[name="day_of_delivery"]').focus();
                // $('input[name="day_of_delivery"]').val(response.info.day_of_delivery);
                // $('input[name="day_of_delivery"]').blur();

                $('input[name="latitude"]').focus();
                $('input[name="latitude"]').val(response.info.latitude);
                $('input[name="latitude"]').blur();

                $('input[name="longitude"]').focus();
                $('input[name="longitude"]').val(response.info.longitude);
                $('input[name="longitude"]').blur();

                $('input[name="postal"]').focus();
                $('input[name="postal"]').val(response.info.postal_code);
                $('input[name="postal"]').blur();

                $('input[name="ntn"]').focus();
                $('input[name="ntn"]').val(response.info.ntn);
                $('input[name="ntn"]').blur();

                $('input[name="strn"]').focus();
                $('input[name="strn"]').val(response.info.strn);
                $('input[name="strn"]').blur();

                $('input[name="merchantName"]').focus();
                $('input[name="merchantName"]').val(response.info.merchant_name);
                $('input[name="merchantName"]').blur();

                $('select[name="type"]').val(response.info.customer_type).trigger('change')
                $('select[name="merchant_type"]').val(response.info.merchant_type).trigger('change');
                $('select[name="parentCompnay"]').val(response.info.parent_company).trigger('change');
                $('select[name="country"]').val(response.info.country).trigger('change');
                //$('select[name="customer_acquisition_source"]').val(response.info.customer_acquisition_source).trigger('change');
                //$('select[name="delivery"]').val(response.info.delivery).trigger('change');
                $('select[name="zone"]').val(response.info.zone_id).trigger('change');

                var imgUrl = response.base_url + '/storage/company/' + response.info.picture;
                $.get(imgUrl)
                    .done(function() {
                        $("#companyPic").attr("data-height", '100px');
                        $("#companyPic").attr("data-default-file", imgUrl);
                        $('#companyPic').dropify();
                    })

                // var docTypes = [];
                // response.document_types.forEach(element => {
                //     docTypes.push(element["document_id"]);
                // });

                // var delivPorts = [];
                // response.delivery_ports.forEach(element => {
                //     delivPorts.push(element["port_name"]);
                // });

                //$('select[name="deliveryPorts"]').val(delivPorts).trigger("change");
                //$('select[name="documentTypes"]').val(docTypes).trigger("change");
                $('textarea[name="description"]').val(response.info.remarks);

            }
        });

        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
    });

    $(document).on('click', '#saveCustomer', function() {

        $('.validationErrors').remove();

        if($('select[name="type"]').val() == 0 || !$('select[name="type"]').val() && $('select[name="zone"]').val() == 0 || !$('select[name="zone"]').val()){
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }else{
            if($('select[name="type"]').val() == 1){
                if (!$('input[name="compName"]').val() || $('select[name="zone"]').val() == 0 || !$('input[name="homePh"]').val() || !$('input[name="address"]').val() || !$('input[name="city"]').val() ) {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Please provide all the required information (*)');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    return;
                }
                if(!$('input[name="email"]').val() == ""){
                    if (!validateEmail($('input[name="email"]').val())) {
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Invalid email format');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    } 
                }
                if(!$('input[name="cnic"]').val() == ""){
                    var thisRef = $('input[name="cnic"]').val();
                    if (thisRef.length != 13) {
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Invalid CNIC');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    }
                }
            }else if($('select[name="type"]').val() == 2){
                if (!$('input[name="orgName"]').val() || $('select[name="zone"]').val() == 0 || !$('input[name="address"]').val() || !$('input[name="city"]').val() ) {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Please provide all the required information (*)');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    return;
                }
                if(!$('input[name="email"]').val() == ""){
                    if (!validateEmail($('input[name="email"]').val())) {
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Invalid email format');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    } 
                }
                
            }else{
                if (!$('input[name="merchantName"]').val() || $('select[name="zone"]').val() == 0 || $('select[name="merchant_type"]').val() == 0 || !$('input[name="address"]').val() || !$('input[name="city"]').val() ) {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Please provide all the required information (*)');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    return;
                }
                if(!$('input[name="email"]').val() == ""){
                    if (!validateEmail($('input[name="email"]').val())) {
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Invalid email format');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                        return;
                    } 
                }
            }
        }

        $('#saveCustomer').attr('disabled', 'disabled');
        $('#cancelCustomer').attr('disabled', 'disabled');
        $('#saveCustomer').text('Processing..');

        $('input[name="document_types"]').val($('select[name="documentTypes"]').val());
        $('input[name="delivery_ports"]').val($('select[name="deliveryPorts"]').val());

        var ajaxUrl = "/Customer";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/Customer/" + $('input[name="product_updating_id"]').val();
        }
        $('#saveCustomerForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveCustomerForm').serialize(),
            cache: false,
            success: function(response) {
                if (JSON.parse(response) == "failed") {
                    $('#saveCustomer').removeAttr('disabled');
                    $('#cancelCustomer').removeAttr('disabled');
                    $('#saveCustomer').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add customer at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    
                } else {
                    if (action == 'CustomerProfile') {
                        fetchCompanyInfoForUpdate($('input[name="product_updating_id"]').val());
                    } else {
                        fetchCompaniesList();
                    }
                    $('#saveCustomer').removeAttr('disabled');
                    $('#cancelCustomer').removeAttr('disabled');
                    $('#saveCustomer').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveCustomerForm').find("input[type=text], textarea").val("");
                        $('#saveCustomerForm').find("select").val("0").trigger('change');
                        $('select[name="deliveryPorts"], select[name="documentTypes"]').val("").trigger('change');
                        $('.dropify-clear').click();
                        //
                        $('#saveCustomerForm').find("input[name=homePh]").val("");
                        $('#saveCustomerForm').find("input[name=state]").val("Sindh");
                        $('#saveCustomerForm').find("input[name=city]").val("Karachi");
                        $('select[name="country"]').val(1).trigger('change');
                    }
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', '#0038ba');
                    $('#notifDiv').text('Customer have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    $('.close_customer_form').click();
                    $('#open_modal').click();
                    $("#add_billing_to_customer").attr("href", "/create_account/"+JSON.parse(response));
                }
                // if (JSON.parse(response) == "success") {
                //     if (action == 'CustomerProfile') {
                //         fetchCompanyInfoForUpdate($('input[name="product_updating_id"]').val());
                //     } else {
                //         fetchCompaniesList();
                //     }
                //     $('#saveCustomer').removeAttr('disabled');
                //     $('#cancelCustomer').removeAttr('disabled');
                //     $('#saveCustomer').text('Save');

                //     if ($('#operation').val() !== "update") {
                //         $('#saveCustomerForm').find("input[type=text], textarea").val("");
                //         $('#saveCustomerForm').find("select").val("0").trigger('change');
                //         $('select[name="deliveryPorts"], select[name="documentTypes"]').val("").trigger('change');
                //         $('.dropify-clear').click();
                //         //
                //         $('#saveCustomerForm').find("input[name=homePh]").val("");
                //         $('#saveCustomerForm').find("input[name=state]").val("Sindh");
                //         $('#saveCustomerForm').find("input[name=city]").val("Karachi");
                //         $('select[name="country"]').val(1).trigger('change');
                //     }
                //     $('#notifDiv').fadeIn();
                //     $('#notifDiv').css('background', '#0038ba');
                //     $('#notifDiv').text('Customer have been added successfully');
                //     setTimeout(() => {
                //         $('#notifDiv').fadeOut();
                //     }, 3000);
                //     $('.close_customer_form').click();
                //     $('#open_modal').click();
                //     $("#add_billing_to_customer").attr("href", "/create_account/"+JSON.parse(response));
                    
                    
                // } else {
                //     $('#saveCustomer').removeAttr('disabled');
                //     $('#cancelCustomer').removeAttr('disabled');
                //     $('#saveCustomer').text('Save');
                //     $('#notifDiv').fadeIn();
                //     $('#notifDiv').css('background', 'red');
                //     $('#notifDiv').text('Failed to add customer at the moment');
                //     setTimeout(() => {
                //         $('#notifDiv').fadeOut();
                //     }, 3000);
                // }
            },
            error: function(err) {
                $('#saveCustomer').removeAttr('disabled');
                $('#cancelCustomer').removeAttr('disabled');
                $('#saveCustomer').text('Save');
                if (err.status == 422) {
                    $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<small class="validationErrors" style="color: red; position: absolute; width:100%; text-align: right; margin-left: -30px">' + error[0] + '</small>'));
                    });
                }
            }
        });
    });

    var customerId = "";
    var thisRef = "";

    // $(document).on('click', '.deleteCustomer', function() {
        
    //     customerId = $(this).attr('id');
    //     thisRef = $(this);
    //     $('#delete_customer_modal').click();
    //     $(document).on('click', '#link_delete_customer', function(){
    //         thisRef.attr('disabled', 'disabled');
    //         thisRef.text('PROCESSING....');
    //         thisRef.parent().ajaxSubmit({
    //             type: "POST",
    //             url: '/Customer/' + customerId,
    //             data: thisRef.parent().serialize(),
    //             cache: false,
    //             success: function(response) {
    //                 if (JSON.parse(response) == "success") {
    //                     $('#notifDiv').fadeIn();
    //                     $('#notifDiv').css('background', '#0038ba');
    //                     $('#notifDiv').text('Customer have been deleted');
    //                     setTimeout(() => {
    //                         $('#notifDiv').fadeOut();
    //                     }, 3000);
    //                     thisRef.parent().parent().parent().remove();
    //                 } else {
    //                     $('#notifDiv').fadeIn();
    //                     $('#notifDiv').css('background', 'red');
    //                     $('#notifDiv').text('Unable to delete the customer at this moment');
    //                     setTimeout(() => {
    //                         thisRef.removeAttr('disabled');
    //                         $('#notifDiv').fadeOut();
    //                     }, 3000);
    //                 }
    //             }
    //         });
    //     });
    // });

    $(document).on('click', '.activate_btn', function(){
        var id = $(this).attr('id');
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");

        $.ajax({
            type: 'GET',
            url: '/activate_customer',
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                if(JSON.parse(response) == "success"){
                    fetchCompaniesList();
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
                    $('#notifDiv').text('Unable to activate employee');
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
            url: '/deactivate_customer',
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                if(JSON.parse(response) == "success"){
                    fetchCompaniesList();
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
                    $('#notifDiv').text('Unable to deactivate employee');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }    
            }
        });
    });
    
});

function fetchCompanyInfoForUpdate(id) {
    $.ajax({
        type: 'GET',
        url: '/Customer/' + id,
        success: function(response) {
            var response = JSON.parse(response);
            $('.nam-title').text(response.info.company_name);
            $('.con_info strong').remove();
            $('.con_info p:eq(0)').append('<strong>' + response.info.company_poc + '</strong>');
            $('.con_info p:eq(1)').append('<strong>' + response.info.business_phone + '</strong>');
            $('.con_info p:eq(2)').append('<strong>' + (response.info.region ? response.info.region : "NA") + '</strong>');
            $('.con_info p:eq(3)').append('<strong>' + (response.info.country).toUpperCase() + '</strong>');

            $('._cut-img img').attr('src', '/storage/company/' + response.info.picture);

            $('#tblLoader').hide();
            $('#contentDiv').fadeIn();
            $('#contentDiv').find('table').css('width', '100%');
        }
    });
}

function fetchCompaniesList() {
    var zone_id = $('#zone_selected_id').val();
    $.ajax({
        type: 'GET',
        url: '/GetCustomersList',
        data: {
            _token: '{!! csrf_token() !!}',
            zone_id: zone_id
        },
        success: function(response) {
           console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="companiesListTable" style="width:100%;"><thead><tr><th>ID</th><th>Customer Name</th><th>POC</th><th>Phone#</th><th>Zone</th><th>Customer Type</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#companiesListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                // <td>' + (element['home_phone'] != null ?  element['home_phone']  : element['business_phone'] ) + '</td>
                $('#companiesListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + (element['company_name'] != null ?  element['company_name']  : (element['organization_name'] != null ? element['organization_name'] : element['merchant_name'])) + '</td><td>' + element['company_poc'] + '</td><td>' + (element['home_phone'] != null ?  element['home_phone']  : element['business_phone'] ) + '</td><td>' + element['zone'] + '</td><td>' + (element['customer_type'] == "1" ? "Residential" : (element['customer_type'] == "2" ? "Corporate" : "Commercial")) + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateCustomer">Edit</button><a href="/CustomerProfile/' + element['id'] + '" id="' + element['id'] + '" class="btn btn-default">Profile</a><a href="#" class="btn btn-default viewOnMap" id="' + element['latitude'] + ',' + element['longitude'] + '" data-toggle="modal" data-target=".customerLocationModal">View on Map</a>'+ (element["customer_activation"] == 1 ? '<button id="' + element['id'] + '" class="btn btn-default red-bg  deactivate_btn" title="View Detail">Deactivate</button>' : '<button id="' + element['id'] + '" class="btn btn-default activate_btn">Activate</button>') +'</td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#companiesListTable').DataTable();
        }
    });
}

function initMap(latitude, longitude) {
    var uluru = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru
    });

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        title: "Customer",
        map: map,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function(e) {
        infowindow.setContent(this.name);
        infowindow.open(map, this);
    }.bind(marker));

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function fetchZoneList() {
    $.ajax({
        type: 'GET',
        url: '/GetZoneListForCustomers',
        success: function(response) {
           //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="companiesListTable" style="width:100%;"><thead><tr><th>ID</th><th>Zone Name</th><th>Delivery Team</th><th>Area</th><th>Total Customers</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#companiesListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#companiesListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['zone_name'] + '</td><td>' + element['delivery_team'] + '</td><td>' + element['area_name'] + '</td><td>' + element['count'] + '</td><td><a href="/Customer_list/' + element['id'] + '"><button id="' + element['id'] + '" class="btn btn-default btn-line">View Detail</button></a></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#companiesListTable').DataTable();
        }
    });
}