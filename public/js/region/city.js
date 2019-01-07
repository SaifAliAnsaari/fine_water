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
           
            if(action == "manage_cities"){
                $('#updateCityForm').prop('id','saveCityForm');
                $('input[name="city"]').val("");
                $('input[name="city"]').blur();
                $('input[name="city_id"]').val("");
                $('input[name="city_id"]').blur();
                $('#saveCity').show();
                $('#updateCity').hide();
            }else if(action == "manage_area"){
                $('#updateAreaForm').prop('id','saveAreaForm');
                $('input[name="area"]').val("");
                $('input[name="area"]').blur();
                $('input[name="area_id"]').val("");
                $('input[name="area_id"]').blur();
                $('#saveAreaForm').find("select").val("0").trigger('change')
                $('#saveArea').show();
                $('#updateArea').hide();
            }else if(action == "manage_zone"){
                $('#updateZoneForm').prop('id','saveZoneForm');
                $('input[name="zone"]').val("");
                $('input[name="zone"]').blur();
                $('input[name="zone_id"]').val("");
                $('input[name="zone_id"]').blur();
                $('#saveZoneForm').find("select").val("0").trigger('change')
                $('#saveZone').show();
                $('#updateZone').hide();
            }
           
           
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

        $('#saveCity').attr('disabled', 'disabled');
        $('#cancelCity').attr('disabled', 'disabled');
        $('#saveCity').text('Processing..');

        var ajaxUrl = "/City_save";

        // if ($('#operation').val() !== "add") {
        //     ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        // }

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

        
        if (!$('input[name="area"]').val() || $('select[name="city_name"]').val() == 0 || !$('select[name="city_name"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }


        $('#saveArea').attr('disabled', 'disabled');
        $('#cancelArea').attr('disabled', 'disabled');
        $('#saveArea').text('Processing..');

        var ajaxUrl = "/Area_save";

        // if ($('#operation').val() !== "add") {
        //     ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        // }

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
                        $('select[name="city_name"]').val("0").trigger('change');
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
        if (!$('input[name="zone"]').val() || $('select[name="area_name"]').val() == 0 || !$('select[name="area_name"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveZone').attr('disabled', 'disabled');
        $('#cancelZone').attr('disabled', 'disabled');
        $('#saveZone').text('Processing..');

        var ajaxUrl = "/Zone_save";

        // if ($('#operation').val() !== "add") {
        //     ajaxUrl = "/City/" + $('input[name="product_updating_id"]').val();
        // }

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
                        $('select[name="area_name"]').val("0").trigger('change');
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


    
    //Update button
    $(document).on('click', '.openDataSidebarForUpdate', function() {
       
        if(action == "manage_cities"){

            $('input[id="operation"]').val('update');
            lastOp = 'update';
            $('#dataSidebarLoader').show();
            $('._cl-bottom').hide();
            $('.pc-cartlist').hide();

            //Form ki id change kr de hai
            $('#saveCityForm').prop('id','updateCityForm');

            var id = $(this).attr('id');
            $('input[name="team_updating_id"]').val(id);
            if (!$('#saveCityForm input[name="_method"]').length) {
                $('#saveCityForm').append('<input name="_method" value="PUT" hidden />');
            }

            $.ajax({
                type: 'GET',
                url: '/city_data/' + id,
                success: function(response) {
                    console.log(response);
                    var response = JSON.parse(response);
                    $('#dataSidebarLoader').hide();
                    $('._cl-bottom').show();
                    $('.pc-cartlist').show();
                    $('#uploadedImg').remove();

                    $('input[name="city"]').focus();
                    $('input[name="city"]').val(response.info.city_name);
                    $('input[name="city"]').blur();

                    $('input[name="city_id"]').val(response.info.id);

                    $('#saveCity').hide();
                    $('#updateCity').show();

                }
            });

            $('#product-cl-sec').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            $('body').toggleClass('no-scroll');
        } 
        if(action == "manage_area"){
            var id = $(this).attr('id');
            $('input[id="operation"]').val('update');
            lastOp = 'update';
            $('#dataSidebarLoader').show();
            $('._cl-bottom').hide();
            $('.pc-cartlist').hide();

            //Form ki id change kr de hai
            $('#saveAreaForm').prop('id','updateAreaForm');

            var id = $(this).attr('id');
            $('input[name="team_updating_id"]').val(id);
            if (!$('#saveAreaForm input[name="_method"]').length) {
                $('#saveAreaForm').append('<input name="_method" value="PUT" hidden />');
            }

            $.ajax({
                type: 'GET',
                url: '/area_data/' + id,
                success: function(response) {
                    console.log(response);
                    var response = JSON.parse(response);
                    $('#dataSidebarLoader').hide();
                    $('._cl-bottom').show();
                    $('.pc-cartlist').show();
                    $('#uploadedImg').remove();

                    $('input[name="area"]').focus();
                    $('input[name="area"]').val(response.info.area_name);
                    $('input[name="area"]').blur();

                    $('input[name="area_id"]').val(response.info.id);

                    $('select[name="city_name"]').val(response.info.city_id).trigger('change');

                    $('#saveArea').hide();
                    $('#updateArea').show();

                }
            });

            $('#product-cl-sec').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            $('body').toggleClass('no-scroll');
        }
        if(action == "manage_zone"){
            var id = $(this).attr('id');
            $('input[id="operation"]').val('update');
            lastOp = 'update';
            $('#dataSidebarLoader').show();
            $('._cl-bottom').hide();
            $('.pc-cartlist').hide();

            //Form ki id change kr de hai
            $('#saveZoneForm').prop('id','updateZoneForm');

            var id = $(this).attr('id');
            $('input[name="team_updating_id"]').val(id);
            if (!$('#saveZoneForm input[name="_method"]').length) {
                $('#saveZoneForm').append('<input name="_method" value="PUT" hidden />');
            }

            $.ajax({
                type: 'GET',
                url: '/zone_data/' + id,
                success: function(response) {
                    console.log(response);
                    var response = JSON.parse(response);
                    $('#dataSidebarLoader').hide();
                    $('._cl-bottom').show();
                    $('.pc-cartlist').show();
                    $('#uploadedImg').remove();

                    $('input[name="zone"]').focus();
                    $('input[name="zone"]').val(response.info.zone_name);
                    $('input[name="zone"]').blur();

                    $('input[name="zone_id"]').val(response.info.id);

                    $('select[name="area_name"]').val(response.info.area_id).trigger('change');

                    $('#saveZone').hide();
                    $('#updateZone').show();

                }
            });

            $('#product-cl-sec').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            $('body').toggleClass('no-scroll');
        }
        
    });


    //UpdateC City
    $(document).on('click', '#updateCity', function() {

        $('#updateCity').attr('disabled', 'disabled');
        $('#updateCity').text('Processing..');
        var ajaxUrl = "/city_update";
        $('#updateCityForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateCityForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchCitiesList();
                    $('#updateCity').removeAttr('disabled');
                    $('#updateCity').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('City have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update city at the moment');
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


    //Update Area
    $(document).on('click', '#updateArea', function() {

        $('#updateArea').attr('disabled', 'disabled');
        $('#updateArea').text('Processing..');
        var ajaxUrl = "/area_update";
        $('#updateAreaForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateAreaForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchAreasList();
                    $('#updateArea').removeAttr('disabled');
                    $('#updateArea').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Area have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update area at the moment');
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


    //Update zone
    $(document).on('click', '#updateZone', function() {

        $('#updateZone').attr('disabled', 'disabled');
        $('#updateZone').text('Processing..');
        var ajaxUrl = "/zone_update";
        $('#updateZoneForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateZoneForm').serialize(),
            cache: false,
            success: function(response) {
               // console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchZoneList();
                    $('#updateZone').removeAttr('disabled');
                    $('#updateZone').text('Update');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Zone have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Update');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update zone at the moment');
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
        if(action == "manage_cities"){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/DeleteCity',
                data: {
                    _token: '{!! csrf_token() !!}',
                   id: id
               },
                success: function(response) {
                    if(JSON.parse(response) == "success"){
                        fetchCitiesList();
                        // $(this).removeAttr('disabled');
                        // $(this).text('Delete');
    
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('City deleted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to delete city');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }
                        
                }
            });
        }else if(action == "manage_area"){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/DeleteArea',
                data: {
                    _token: '{!! csrf_token() !!}',
                   id: id
               },
                success: function(response) {
                    console.log(response);
                    if(JSON.parse(response) == "success"){
                        fetchAreasList();
                        // $(this).removeAttr('disabled');
                        // $(this).text('Delete');
    
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Area deleted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to delete area');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }
                        
                }
            });
        }else if(action == "manage_zone"){
            $(this).text('PROCESSING....');
            $(this).attr("disabled", "disabled");
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                url: '/DeleteZone',
                data: {
                    _token: '{!! csrf_token() !!}',
                   id: id
               },
                success: function(response) {
                    console.log(response);
                    if(JSON.parse(response) == "success"){
                        fetchZoneList();
                        // $('#deletebtn').removeAttr('disabled');
                        // $('#deletebtn').text('Delete');
    
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'green');
                        $('#notifDiv').text('Zone deleted successfully');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }else if(JSON.parse(response) == "failed"){
                        $('#notifDiv').fadeIn();
                        $('#notifDiv').css('background', 'red');
                        $('#notifDiv').text('Unable to delete zone');
                        setTimeout(() => {
                            $('#notifDiv').fadeOut();
                        }, 3000);
                    }
                        
                }
            });
        }
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
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['city_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate edit_city_btn">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
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
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['area_name'] +  '</td><td>' + element['city_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate edit_city_btn">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
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
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['zone_name'] +  '</td><td>' + element['area_name'] +  '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdate edit_city_btn">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deletebtn" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#clientsListTable').DataTable();
        }
    });
}