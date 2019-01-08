$(document).ready(function(){

    fetchTeamssList();

    var ids = [];
    var names = [];
    $.ajax({
        type: 'GET',
        url: '/get_all_user',
        success: function(response) {
            //console.log(response);
            var response = JSON.parse(response);
            
                response.forEach(element => {
                    ids.push(element["id"]);
                    names.push(element['username']);
                });
            
        }
    });

    var lastOp = "add";
    var client_id = "";
    $(document).on('click', '.openDataSidebarForAddingDeliveryTeam', function() {
        //Form ki id change kr de hai
        $('#updateDeliveryForm').prop('id','saveDeliveryForm');

        $('#select_memebr')
        .find('option')
        .remove()
        .end()
        .append('<option disabled value="0">Select Team Members</option>')
        .val(-1);

        var remaining_options = "";
        for(var j = 0; j < ids.length; j++) {
            remaining_options += "<option value='" + ids[j] + "'>" + names[j] + "</option>";
        }
        $( 'select[name="select_memebr"]' ).append( remaining_options );

        $('#saveDeliveryTeam').show();
        $('#updateDeliveryTeam').hide();
        if (lastOp == "update") {
            $('input[name="team_id"]').val("");
            $('input[name="team_id"]').blur();

            $('input[name="team_name"]').val("");
            $('input[name="team_name"]').blur();

            $('input[name="vehical_make_model"]').val("");
            $('input[name="vehical_make_model"]').blur();

            $('input[name="vehical_type"]').val("");
            $('input[name="vehical_type"]').blur();

            $('input[name="vehical_license_num"]').val("");
            $('input[name="vehical_license_num"]').blur();

            $('input[name="vehical_capicity_filled"]').val("");
            $('input[name="vehical_capicity_filled"]').blur();

            $('input[name="vehical_capicity_empty"]').val("");
            $('input[name="vehical_capicity_empty"]').blur();

            $('select[name="select_memebr"]').val("-1").trigger('change');
            $('select[name="area_name"]').val("0").trigger('change');
            
        }
        lastOp = 'add';
        if ($('#saveDeliveryForm input[name="_method"]').length) {
            $('#saveDeliveryForm input[name="_method"]').remove();
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


    $(document).on('click', '.openDataSidebarForUpdateTeam', function() {

        $('#select_memebr')
        .find('option')
        .remove()
        .end()
        .append('<option value="0" disabled>Select Team Member</option>')
        .val(-1);

        $('input[id="operation"]').val('update');
        lastOp = 'update';
        $('#dataSidebarLoader').show();
        $('._cl-bottom').hide();
        $('.pc-cartlist').hide();

        //Form ki id change kr de hai
        $('#saveDeliveryForm').prop('id','updateDeliveryForm');
        var id = $(this).attr('id');
        $('input[name="team_updating_id"]').val(id);
        if (!$('#saveDeliveryForm input[name="_method"]').length) {
            $('#saveDeliveryForm').append('<input name="_method" value="PUT" hidden />');
        }

        $('#dropifyImgDiv').empty();
        $('#dropifyImgDiv').append('<input type="file" name="compPicture" id="companyPic" class="dropify" />');

        $.ajax({
            type: 'GET',
            url: '/team_data/' + id,
            success: function(response) {
                //console.log(response);
                var response = JSON.parse(response);
                $('#dataSidebarLoader').hide();
                $('._cl-bottom').show();
                $('.pc-cartlist').show();
                $('#uploadedImg').remove();

                $('input[name="team_name"]').focus();
                $('input[name="team_name"]').val(response.info.team_name);
                $('input[name="team_name"]').blur();

                $('input[name="vehical_make_model"]').focus();
                $('input[name="vehical_make_model"]').val(response.info.vehical_make_model);
                $('input[name="vehical_make_model"]').blur();

                $('input[name="vehical_type"]').focus();
                $('input[name="vehical_type"]').val(response.info.vehical_type);
                $('input[name="vehical_type"]').blur();

                $('input[name="vehical_license_num"]').focus();
                $('input[name="vehical_license_num"]').val(response.info.vehical_license);
                $('input[name="vehical_license_num"]').blur();

                $('input[name="vehical_capicity_filled"]').focus();
                $('input[name="vehical_capicity_filled"]').val(response.info.capacity_filled);
                $('input[name="vehical_capicity_filled"]').blur();

                $('input[name="vehical_capicity_empty"]').focus();
                $('input[name="vehical_capicity_empty"]').val(response.info.capacity_empty);
                $('input[name="vehical_capicity_empty"]').blur();

                $('input[name="team_id"]').val(response.info.id);

                $('select[name="area_name"]').val(response.info.area_id).trigger('change');
                
                var _members = [];
                var _mem_names = [];
                response.members.forEach(element => {
                    _members.push(element["user_id"]);
                    _mem_names.push(element['name']);
                });

                // var common = [];
                // $.grep(ids, function(element) {
                //    common.push($.inArray(element, _members) !== -1);
                // });
                // var common_names = [];
                // $.grep(names, function(element) {
                //     common_names.push($.inArray(element, _mem_names) !== -1);
                // });
                var optionsAsString = "";
                var remaining_options = "";
                for(var i = 0; i < _members.length; i++) {
                    optionsAsString += "<option value='" + _members[i] + "'>" + _mem_names[i] + "</option>";
                }
                for(var j = 0; j < ids.length; j++) {
                    remaining_options += "<option value='" + ids[j] + "'>" + names[j] + "</option>";
                }
                $( 'select[name="select_memebr"]' ).append( optionsAsString );
                $( 'select[name="select_memebr"]' ).append( remaining_options );
                $('select[name="select_memebr"]').val(_members).trigger("change");

                $('#saveDeliveryTeam').hide();
                $('#updateDeliveryTeam').show();

            }
        });

        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
    });


    $(document).on('click', '#saveDeliveryTeam', function() {

        if (!$('input[name="team_name"]').val() || !$('input[name="vehical_make_model"]').val() || !$('input[name="vehical_type"]').val() || 
            !$('input[name="vehical_license_num"]').val() || !$('input[name="vehical_capicity_filled"]').val() || !$('input[name="vehical_capicity_empty"]').val() ||
            !$('select[name="select_memebr"]').val() || !$('select[name="area_name"]').val() || $('select[name="select_memebr"]').val() == 0 || $('select[name="area_name"]').val() == 0) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        $('#saveAddAnotherCustomer').attr('disabled', 'disabled');
        $('#saveDeliveryTeam').attr('disabled', 'disabled');
        $('#cancelDeliveryTeam').attr('disabled', 'disabled');
        $('#saveDeliveryTeam').text('Processing..');

        $('#saveDeliveryForm').append('<input type="text" name="team_members" value="'+$('select[name="select_memebr"]').val()+'" hidden />');

        var ajaxUrl = "/DeliveryTeam_save";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/DeliveryTeam/" + $('input[name="team_updating_id"]').val();
        }

        $('#saveDeliveryForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveDeliveryForm').serialize(),
            cache: false,
            success: function(response) {
                $('input[name="team_members"]').remove();
                //console.log(response);
                if (JSON.parse(response) == "success") {
                    location.reload();
                    fetchTeamssList();
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveDeliveryForm').find("input[type=text]").val("");
                        $('.dropify-clear').click();
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Team have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add team at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Team already exist');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            },
            error: function(err) {
                $('input[name="team_members"]').remove();
                if (err.status == 422) {
                    $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<small style="color: red; position: absolute; width:100%; text-align: right; margin-left: -30px">' + error[0] + '</small>'));
                    });
                }
            }
        });

    });


    $(document).on('click', '#updateDeliveryTeam', function() {

        $('#updateDeliveryForm').append('<input type="text" name="team_members" value="'+$('select[name="select_memebr"]').val()+'" hidden />'); 
        $('#updateDeliveryTeam').attr('disabled', 'disabled');
        $('#updateDeliveryTeam').text('Processing..');
        var ajaxUrl = "/team_update";
        $('#updateDeliveryForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#updateDeliveryForm').serialize(),
            cache: false,
            success: function(response) {
                $('input[name="team_members"]').remove();
                if (JSON.parse(response) == "success") {
                    location.reload();
                    fetchTeamssList();
                    $('#updateDeliveryTeam').removeAttr('disabled');
                    $('#updateDeliveryTeam').text('Save');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Team have been updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if(JSON.parse(response) == "failed"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to update team at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }else if(JSON.parse(response) == "already exist"){
                    $('#saveDeliveryTeam').removeAttr('disabled');
                    $('#cancelDeliveryTeam').removeAttr('disabled');
                    $('#saveDeliveryTeam').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Team already exist');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            },
            error: function(err) {
                $('input[name="team_members"]').remove();
                if (err.status == 422) {
                    $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<small style="color: red; position: absolute; width:100%; text-align: right; margin-left: -30px">' + error[0] + '</small>'));
                    });
                }
            }
        });

    });


    $(document).on('click', '.deleteTeam', function(){
        $(this).text('PROCESSING....');
        $(this).attr("disabled", "disabled");
        var id = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: '/DeleteTeam',
            data: {
                _token: '{!! csrf_token() !!}',
               id: id
           },
            success: function(response) {
                //console.log(response);
                    fetchTeamssList();
                    // $('#deleteTeam').removeAttr('disabled');
                    // $('#deleteTeam').text('Delete');

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Team deleted successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
            }
        });
    });
    

});

function fetchTeamssList() {
    $.ajax({
        type: 'GET',
        url: '/GetTeamsList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="teamListTable" style="width:100%;"><thead><tr><th>ID</th><th>Team Name</th><th>Vehical Type</th><th>License</th><th>Filled Bottle Capacity</th><th>Empty Bottle Capicity</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#teamListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#teamListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['team_name'] + '</td><td>' + element['vehical_type'] + '</td><td>' + element['vehical_license'] + '</td><td>' + element['capacity_filled'] + '</td><td>' + element['capacity_empty'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateTeam edit_team_btn">Edit</button><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deleteTeam" title="Delete">Delete</button></form></td></tr>');
                
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#teamListTable').DataTable();
        }
    });
}