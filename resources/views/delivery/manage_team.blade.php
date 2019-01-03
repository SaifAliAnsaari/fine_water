@extends('layouts.master')


@section('data-sidebar')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span>Team</span></div>
    <div style="min-height: 400px" id="dataSidebarLoader" style="display: none">
        <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
    </div>
    <div class="pc-cartlist">
        <form style="display: flex; width:100%" id="saveDeliveryForm">
            <input type="text" value="" name="team_id" hidden/>
            {!! Form::hidden('team_updating_id', '') !!}
            {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
            @csrf
            <input type="text" id="operation" hidden>
            <div class="overflow-plist">
                <div class="plist-content">
                    <div class="_left-filter" style="padding-top: 30px">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">
                                        <h2 class="_head03 PT-10">Team <span> Name</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label mb-10">Team Name*</label>
                                                    <input type="text" name="team_name" class="form-control" placeholder="" required>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="_head03 PT-10">Vehicle <span> Information</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Vehicle Make & Model*</label>
                                                        <input type="text" name="vehical_make_model" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Vehicle Type*</label>
                                                        <input type="text" name="vehical_type" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Vehicle License #*</label>
                                                        <input type="text" name="vehical_license_num" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Vehicle Capacity for Filled Bottle*</label>
                                                        <input type="number" name="vehical_capicity_filled" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Vehicle Capacity for Empty Bottles*</label>
                                                        <input type="number" name="vehical_capicity_empty" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 class="_head03 PT-10">Team <span> Members</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="col-md-12">
                                                    <div class="form-s2">
                                                        <label class="PT-10 font12">Select Team Member*</label>
                                                        <select class="form-control sd-type" name="select_memebr" multiple="multiple">
                                                            <option value="0" disabled>Select Team Member</option>
                                                            <?php
                                                                if(!$users->isEmpty()){
                                                                    foreach($users as $user){ ?>
                                                                        <option value="<?= $user->id ?>"><?= $user->username ?></option>
                                                                    <?php }
                                                                }
                                                            ?>
                                                        </select>
                                                    </div>
                                            </div>
                                        </div>
                                        <h2 class="_head03 PT-10">Assign Delivery <span> Team Area</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <select class="form-control formselect" name="area_name" placeholder="Select Area">
                                                        <option value="0" disabled selected>Select Area</option>
                                                        <?php
                                                            if(!$areas->isEmpty()){
                                                                foreach($areas as $area){ ?>
                                                                    <option value="<?= $area->id ?>"><?= $area->area_name ?></option>
                                                                <?php }
                                                            }
                                                        ?>
                                                    </select>
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
        <button type="submit" class="btn btn-primary mr-2" id="saveDeliveryTeam">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="updateDeliveryTeam" style = "display:none;">Update</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2" id="cancelDeliveryTeam">Cancel</button>
    </div>
</div>
@endsection


@section('content')
<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Delivery Team</h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Delivery Team</span></a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <a class="btn add_button openDataSidebarForAddingDeliveryTeam"><i class="fa fa-plus"></i> Add Delivery Team</a>
                <h2>Delivery Team List</h2>
            </div>
            <div style="min-height: 400px" id="tblLoader">
                <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
            </div>
            <div id="HTMLtoPDF">
                {{-- <header>
                    <div class = "row">
                        <div class = "col-md-5" style = "padding:15px;">
                            <div class = "row" style = "padding:15px;">
                                <img src='images/logo.PNG' alt="Logo">
                            </div>
                            <div class = "row" style = "padding:15px;">
                                <span style = "color:#354879; margin-left:20px; font-size: 20px; font-weight: bold;">Billed To:</span>
                            </div>
                            <div class = "row" style = "padding:15px;">
                                <span style = "color:#354879; margin-left:20px; font-size: 16px; font-weight: bold;">Indus Motors Corporation</span>
                                <br>
                                <span style = "color:#354879; margin-left:20px; font-size: 14px;">House # 123, Street, Area, Rawalpindi</span>
                                <br>
                                <span style = "color:#354879; margin-left:20px; font-size: 14px;">STRN# : 0215457887787</span> 
                                <br>
                                <span style = "color:#354879; margin-left:20px; font-size: 14px;">NTN# : abc457845sa</span>
                            </div>
                        </div>
                        <div class = "col-md-3"></div>
                        <div class = "col-md-4" style = "padding:15px;">
                            <div style = "background-color:#354879; width:100%; height:50px; position: relative;" >
                                <span style = "color:white; margin-left: 15px; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);">e-Invoice</span>
                            </div>
                            <div class = "row" style = "margin-left:15px;">
                                <span style = "color:#354879; margin-top:10px; font-size: 12px;">Account Number : 123456</span>
                            </div>
                            <div class = "row" style = "margin-left:15px;">
                                <span style = "color:#354879; margin-top:10px; font-size: 12px;">Invoice Number : 001</span>
                            </div>
                            <div class = "row" style = "margin-left:15px;">
                                <span style = "color:#354879; margin-top:10px; font-size: 12px;">Invoice Date : 3/12/2018</span>
                            </div>
                            <div class = "row" style = "margin-left:15px;">
                                <span style = "color:#354879; margin-top:10px; font-size: 12px;">Invoice Period : 1/12/2019 - 15/2/2019</span>
                            </div> 
                        </div>
                    </div>
                </header> --}}
                <div class="body" style="display: none">
                </div>
                {{-- <footer align="center"> 
                    <span style = "color:#354879; margin-left:20px; font-size: 16px; font-weight: bold;">H Shippers</span>
                    <br>
                    <span style = "color:#354879; margin-left:20px; font-size: 12px;">Complete address of company plus city and country</span>
                    <br>
                    <span style = "color:#354879; margin-left:20px; font-size: 12px;">| 03124678912 |</span>
                    <br>
                    <span style = "color:#354879; margin-left:20px; font-size: 12px;">| NTN#12345678 | GST#12346789 |</span>
                    <br>
                    <span style = "color:#354879; margin-left:20px; font-size: 12px;">website name</span> 
                    <br>
                </footer> --}}
            </div>
        </div>
    </div>
</div>
<a href="#" id ="download-btn" onclick="HTMLtoPDF()">Download</a>
@endsection