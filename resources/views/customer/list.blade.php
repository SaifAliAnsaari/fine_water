@extends('layouts.master')

@section('data-sidebar')
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content top-borderRed">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete <span></span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <div class="col-md-12">
                    <p>Are you sure you want to delete?</p>
                </div>

        </div>
        <div class="modal-footer border-0">
            <a id="link_delete_customer"><button type="button" data-dismiss="modal" class="btn btn-primary">Yes</button></a>
            <button type="submit" class="btn btn-cancel" data-dismiss="modal" aria-label="Close">No</button>
        </div>
        </div>
    </div>
</div>

<input type="text" id="zone_selected_id" value="<?= $zone_id ?>" hidden/>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content top_border">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Customer <span>has been successfully added</span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body p-30">
        <div class="form-wrap p-0">	

        <h1 class="_head05">Add <span>Billing Account?</span></h1>		 

        <a id="add_billing_to_customer" href=""><button type="submit" class="btn btn-primary mr-2 mb-2">Yes</button></a>
        <button type="submit" class="btn btn-primary mr-2 mb-2" data-dismiss="modal">No</button>

                            

    <div class="modal-footer p-0 border-0">
    <button type="submit" class="btn btn-cancel" data-dismiss="modal" aria-label="Close">Close</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">Add Another</button>
    </div>


        </div>
        </div>
    </div>
    </div>
</div> 
    
<div id="product-cl-sec">
    <a href="" id="pl-close" class="close-btn-pl close_customer_form"></a>
    <div class="pro-header-text">New <span>Customer</span></div>
    <div style="min-height: 400px" id="dataSidebarLoader" style="display: none">
        <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
    </div>
    <div class="pc-cartlist">
        <form style="display: flex;" id="saveCustomerForm">
            {!! Form::hidden('product_updating_id', '') !!}
            {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
            @csrf
            <input type="text" id="operation" hidden>
            <div class="overflow-plist">
                <div class="plist-content">
                    <div class="_left-filter">
                        <div class="se_cus-type p-20 mb-3">
                            <h2 class="_head04 border-0">Select <span> Customer Type</span></h2>
                            <div class = "row">
                                <div class="form-s2 col-md-6">
                                    <select class="form-control formselect" name="type" placeholder="Select Customer Type">
                                        <option value="0" selected disabled>Select Customer Type</option>
                                        <option value="1">Residential</option>
                                        <option value="2">Corporate</option>
                                        <option value="3">Commercial</option>
                                    </select>
                                </div>
                                <div class="form-s2 col-md-6">
                                    @if(!$zone->isEmpty())
                                        <select class="form-control formselect" name="zone" placeholder="Select Zone*" required>
                                            <option value="0" disabled selected>Select Zone*</option>
                                            @foreach ($zone as $zone)
                                                <option value="{{ $zone->id }}">{{ $zone->zone_name }}</option>
                                            @endforeach
                                        </select>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">
                                        <h2 class="_head03">Customer <span>Details</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Customer Name*</label>
                                                        <input type="text" name="compName" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Organization Name*</label>
                                                        <input type="text" name="orgName" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Merchant Name*</label>
                                                        <input type="text" name="merchantName" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-s2 pt-19">
                                                        <select class="form-control formselect" name="merchant_type" placeholder="select Merchant Type*">
                                                            <option value="0">Merchant Type*</option>
                                                            <option value="type1">Type 1</option>
                                                            <option value="type2">Type 2</option> 
                                                            <option value="type3">Type 3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">POC</label>
                                                        <input type="text" name="poc" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Job Title</label>
                                                        <input type="text" name="jobTitle" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="_head03 PT-20">Contact <span>Details</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Office Phone</label>
                                                        <input type="number" name="businessPh" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Home Phone*</label>
                                                        <input type="number" name="homePh" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Mobile Number</label>
                                                        <input type="number" name="mobPh" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Fax No</label>
                                                        <input type="number" name="faxPh" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Cnic</label>
                                                        <input type="number" name="cnic" maxlength="13" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Address*</label>
                                                        <input type="text" name="address" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Postal Code</label>
                                                        <input type="number" name="postal" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">City*</label>
                                                        <input type="text" name="city" class="form-control" value="Karachi" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">State/Province</label>
                                                        <input type="text" name="state" value="Sindh" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-s2 pt-19">
                                                        <select class="form-control formselect" name="country" placeholder="select Country*">
                                                            <option value="0" disabled>Select Country</option>
                                                            <option value="1" selected>Pakistan</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {{-- <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Region</label>
                                                        <input type="text" name="region" class="form-control" placeholder="">
                                                    </div>
                                                </div> --}}
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Email address</label>
                                                        <input type="email" name="email" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Web Page Address</label>
                                                        <input type="text" name="webpage" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">STRN</label>
                                                        <input type="text" name="strn" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">NTN</label>
                                                        <input type="text" name="ntn" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Latitude</label>
                                                        <input type="number" name="latitude" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Longitude</label>
                                                        <input type="number" name="longitude" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                {{-- <div class="col-md-6">
                                                    <div class="form-s2 pt-19">
                                                        <select class="form-control formselect" name="delivery" placeholder="Delivery Weeks*">
                                                            <option value="0" disabled selected>Delivery Weeks</option>
                                                            <option value="weekly">Weekly</option>
                                                            <option value="monthly">Monthly</option> 
                                                            <option value="daily">Daily</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Days of delivery</label>
                                                        <input type="text" name="day_of_delivery" class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Bottles Per Week</label>
                                                        <input type="number" name="bottles_per_week" class="form-control" placeholder="">
                                                    </div>
                                                </div> --}}
                                                {{-- <div class="col-md-6">
                                                    <div class="form-s2 pt-19">
                                                        <select class="form-control formselect" name="customer_acquisition_source" placeholder="Customer Source*">
                                                            <option value="0" disabled selected>Customer Source</option>
                                                            <option value="source 1">Source 1</option>
                                                            <option value="source 2">Source 2</option> 
                                                            <option value="source 3">Source 3</option>
                                                        </select>
                                                    </div>
                                                </div> --}}
                                            </div>
                                        </div>
                                        <h2 class="_head03 PT-20">Additional <span>Details</span></h2>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-wrap pt-19" id="dropifyImgDiv">
                                                    <div class="upload-pic"></div>
                                                    <input type="file" name="compPicture" id="input-file-now" class="dropify" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="_cl-bottom">
        {{-- data-toggle="modal" data-target=".bd-example-modal-lg" --}}
        <button  class="btn btn-default red-bg" data-toggle="modal" data-target="#exampleModal" id="delete_customer_modal" hidden>Delete</button>
        <button type="submit" class="btn btn-primary mr-2" id="open_modal" data-toggle="modal" data-target=".bd-example-modal-lg" style="display:none">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="saveCustomer">Save</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2" id="cancelCustomer">Cancel</button>
    </div>
</div>
@endsection

@section('content')
<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Customers</h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Customers</span></a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <a class="btn add_button openDataSidebarForAddingCustomer"><i class="fa fa-plus"></i> Add Customer</a>
                <h2>Customers List</h2>
            </div>
            <div style="min-height: 400px" id="tblLoader">
                <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
            </div>
            <div class="body" style="display: none">
            </div>
        </div>
    </div>
</div>
@endsection
