$(document).ready(function(){

    var segments = location.href.split('/');
    var action = segments[3];
    if(action == "manage_cities"){
        fetchCitiesList();
    }else if(action == "manage_area"){
        fetchAreasList();
    }else if(action == "manage_zone"){
        fetchZoneList();
    }

    var lastOp = "add";
    var client_id = "";
    $(document).on('click', '.openDataSidebarForAddingCity', function() {
        //alert('here');
        if (lastOp == "update") {
            //alert(client_id);
            // $('input[name="compName"]').val("");
            // $('input[name="compName"]').blur();
            // $('input[name="compName"]').val("");
            // $('input[name="compName"]').blur();
            // $('input[name="poc"]').val("");
            // $('input[name="poc"]').blur();
            // $('input[name="jobTitle"]').val("");
            // $('input[name="jobTitle"]').blur();
            // $('input[name="businessPh"]').val("");
            // $('input[name="businessPh"]').blur();
            // $('input[name="homePh"]').val("");
            // $('input[name="homePh"]').blur();
            // $('input[name="mobPh"]').val("");
            // $('input[name="mobPh"]').blur();
            // $('input[name="whatsappPh"]').val("");
            // $('input[name="whatsappPh"]').blur();
            // $('input[name="faxPh"]').val("");
            // $('input[name="faxPh"]').blur();
            // $('input[name="address"]').val("");
            // $('input[name="address"]').blur();
            // $('input[name="city"]').val("");
            // $('input[name="city"]').blur();
            // $('input[name="state"]').val("");
            // $('input[name="state"]').blur();
            // $('input[name="region"]').val("");
            // $('input[name="region"]').blur();
            // $('input[name="email"]').val("");
            // $('input[name="email"]').blur();
            // $('input[name="webpage"]').val("");
            // $('input[name="webpage"]').blur();
            // $('textarea[name="description"]').val("");

            // $('#saveCityForm').find("select").val("0").trigger('change');
        }
        lastOp = 'add';
        if ($('#saveCityForm input[name="_method"]').length) {
            $('#saveCityForm input[name="_method"]').remove();
        }
        $('input[id="operation"]').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="companyPic" class="dropify" />');
        $('#companyPic').dropify();
    });



    //save city
    $(document).on('click', '#saveCity', function() {

        if (!$('input[name="city"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        // $('#saveAddAnotherCustomer').attr('disabled', 'disabled');
        $('#saveCity').attr('disabled', 'disabled');
        $('#cancelCity').attr('disabled', 'disabled');
        $('#saveCity').text('Processing..');

        var ajaxUrl = "/City_save";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        }

        $('#saveCityForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveCityForm').serialize(),
            cache: false,
            success: function(response) {
                //console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchCitiesList();
                    $('#saveCity').removeAttr('disabled');
                    $('#cancelCity').removeAttr('disabled');
                    $('#saveCity').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveCityForm').find("input[type=text]").val("");
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('City have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveCity').removeAttr('disabled');
                    $('#cancelCity').removeAttr('disabled');
                    $('#saveCity').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add city at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveCity').removeAttr('disabled');
                    $('#cancelCity').removeAttr('disabled');
                    $('#saveCity').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('City already exist');
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

    //save area
    $(document).on('click', '#saveArea', function() {

        //alert('here');
        if (!$('input[name="area"]').val() || $('select[name="city_name"]').val() == 0) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        // $('#saveAddAnotherCustomer').attr('disabled', 'disabled');
        $('#saveArea').attr('disabled', 'disabled');
        $('#cancelArea').attr('disabled', 'disabled');
        $('#saveArea').text('Processing..');

        var ajaxUrl = "/Area_save";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        }

        $('#saveAreaForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveAreaForm').serialize(),
            cache: false,
            success: function(response) {
                console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchAreasList();
                    $('#saveArea').removeAttr('disabled');
                    $('#cancelArea').removeAttr('disabled');
                    $('#saveArea').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveAreaForm').find("input[type=text]").val("");
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Area have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveArea').removeAttr('disabled');
                    $('#cancelArea').removeAttr('disabled');
                    $('#saveArea').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add area at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveArea').removeAttr('disabled');
                    $('#cancelArea').removeAttr('disabled');
                    $('#saveArea').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Area already exist');
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

    //save zone
    $(document).on('click', '#saveZone', function() {

        //alert('here');
        if (!$('input[name="zone"]').val() || $('select[name="area_name"]').val() == 0) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        // $('#saveAddAnotherCustomer').attr('disabled', 'disabled');
        $('#saveZone').attr('disabled', 'disabled');
        $('#cancelZone').attr('disabled', 'disabled');
        $('#saveZone').text('Processing..');

        var ajaxUrl = "/Zone_save";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        }

        $('#saveZoneForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveZoneForm').serialize(),
            cache: false,
            success: function(response) {
                console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchZoneList();
                    $('#saveZone').removeAttr('disabled');
                    $('#cancelZone').removeAttr('disabled');
                    $('#saveZone').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveZoneForm').find("input[type=text]").val("");
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Zone have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveZone').removeAttr('disabled');
                    $('#cancelZone').removeAttr('disabled');
                    $('#saveZone').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add zone at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveZone').removeAttr('disabled');
                    $('#cancelZone').removeAttr('disabled');
                    $('#saveZone').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Zone already exist');
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


    
    $(document).on('click', '.edit_city_btn', function() {
        lastOp = "update";
        id = $(this).attr('id');

        $.ajax({
            type: 'GET',
            url: '/GetCityData',
            data: {
                _token: '{!! csrf_token() !!}',
                id: id
            },
            success: function(response) {
                console.log(response);
                $('input[id="operation"]').val('update');
                $('#product-cl-sec').addClass('active');
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
                $('body').toggleClass('no-scroll');

                $('input[name="city"]').val("");
                $('input[name="city"]').blur();

            }
        });
        
    });


});

function fetchCitiesList() {
    $.ajax({
        type: 'GET',
        url: '/GetCitiesList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="clientsListTable" style="width:100%;"><thead><tr><th>ID</th><th>City Name</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#clientsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['city_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateCustomer edit_city_btn">Edit</button><a href="/CustomerProfile/' + element['id'] + '" id="' + element['id'] + '" class="btn btn-default">Profile</a><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deleteCustomer" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#clientsListTable').DataTable();
        }
    });
}

function fetchAreasList(){
    $.ajax({
        type: 'GET',
        url: '/GetAreasList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="clientsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Area Name</th><th>City Name</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#clientsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['area_name'] +  '</td><td>' + element['city_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateCustomer edit_city_btn">Edit</button><a href="/CustomerProfile/' + element['id'] + '" id="' + element['id'] + '" class="btn btn-default">Profile</a><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deleteCustomer" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#clientsListTable').DataTable();
        }
    });
}

function fetchZoneList(){
    $.ajax({
        type: 'GET',
        url: '/GetZonesList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="clientsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Zone Name</th><th>Area Name</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#clientsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['zone_name'] +  '</td><td>' + element['area_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateCustomer edit_city_btn">Edit</button><a href="/CustomerProfile/' + element['id'] + '" id="' + element['id'] + '" class="btn btn-default">Profile</a><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deleteCustomer" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#clientsListTable').DataTable();
        }
    });
}