$(document).ready(function() {

    fetchClientsList();

    var lastOp = "add";
    var client_id = "";
    $(document).on('click', '.openDataSidebarForAddingClient', function() {
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

            // $('#saveClientForm').find("select").val("0").trigger('change');
        }
        lastOp = 'add';
        if ($('#saveClientForm input[name="_method"]').length) {
            $('#saveClientForm input[name="_method"]').remove();
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



    $(document).on('click', '#saveClient', function() {

        if (!$('input[name="username"]').val() || !$('input[name="password"]').val() || !$('input[name="client_name"]').val() || !$('input[name="email"]').val()) {
            $('#notifDiv').fadeIn();
            $('#notifDiv').css('background', 'red');
            $('#notifDiv').text('Please provide all the required information (*)');
            setTimeout(() => {
                $('#notifDiv').fadeOut();
            }, 3000);
            return;
        }

        // $('#saveAddAnotherCustomer').attr('disabled', 'disabled');
        $('#saveClient').attr('disabled', 'disabled');
        $('#cancelClient').attr('disabled', 'disabled');
        $('#saveClient').text('Processing..');

        var ajaxUrl = "/Client_save";

        if ($('#operation').val() !== "add") {
            ajaxUrl = "/Client/" + $('input[name="product_updating_id"]').val();
        }

        $('#saveClientForm').ajaxSubmit({
            type: "POST",
            url: ajaxUrl,
            data: $('#saveClientForm').serialize(),
            cache: false,
            success: function(response) {
                //console.log(response);
                if (JSON.parse(response) == "success") {
                    fetchClientsList();
                    $('#saveClient').removeAttr('disabled');
                    $('#cancelClient').removeAttr('disabled');
                    $('#saveClient').text('Save');

                    if ($('#operation').val() !== "update") {
                        $('#saveClientForm').find("input[type=text]").val("");
                        $('.dropify-clear').click();
                    }

                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', '#0038ba');
                    $('#notifDiv').text('Client have been added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if (JSON.parse(response) == "failed") {
                    $('#saveClient').removeAttr('disabled');
                    $('#cancelClient').removeAttr('disabled');
                    $('#saveClient').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add customer at the moment');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                } else if (JSON.parse(response) == "already exist") {
                    $('#saveClient').removeAttr('disabled');
                    $('#cancelClient').removeAttr('disabled');
                    $('#saveClient').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Client already exist');
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

    $(document).on('click', '.edit_client_btn', function() {
        lastOp = "update";
        id = $(this).attr('id');

        $.ajax({
            type: 'GET',
            url: '/GetClientData',
            data: {
                _token: '{!! csrf_token() !!}',
                id: id
            },
            success: function(response) {
                //console.log(response);


            }
        });

        $('input[id="operation"]').val('update');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');

        // $('input[name="compName"]').val("");
        // $('input[name="compName"]').blur();
        // $('input[name="poc"]').val("");
        // $('input[name="poc"]').blur();
        // $('input[name="jobTitle"]').val("");
        // $('input[name="jobTitle"]').blur();

    });


});

function fetchClientsList() {
    $.ajax({
        type: 'GET',
        url: '/GetClientsList',
        success: function(response) {
            //console.log(response);
            $('.body').empty();
            $('.body').append('<table class="table table-hover dt-responsive nowrap" id="clientsListTable" style="width:100%;"><thead><tr><th>ID</th><th>Client Name</th><th>POC</th><th>Username</th><th>Phone#</th><th>Email</th><th>Action</th></tr></thead><tbody></tbody></table>');
            $('#clientsListTable tbody').empty();
            var response = JSON.parse(response);
            response.forEach(element => {
                $('#clientsListTable tbody').append('<tr><td>' + element['id'] + '</td><td>' + element['client_name'] + '</td><td>' + element['poc'] + '</td><td>' + element['username'] + '</td><td>' + element['phone'] + '</td><td>' + element['email'] + '</td><td><button id="' + element['id'] + '" class="btn btn-default btn-line openDataSidebarForUpdateCustomer edit_client_btn">Edit</button><a href="/CustomerProfile/' + element['id'] + '" id="' + element['id'] + '" class="btn btn-default">Profile</a><form id="deleteCustomerForm" style="display: inline-block"><input type="text" name="_method" value="DELETE" hidden /><input type="text" name="_token" value="' + $('input[name="tokenForAjaxReq"]').val() + '" hidden /><button type="button" id="' + element['id'] + '" class="btn btn-default red-bg deleteCustomer" title="Delete">Delete</button></form></td></tr>');
            });
            $('#tblLoader').hide();
            $('.body').fadeIn();
            $('#clientsListTable').DataTable();
        }
    });
}