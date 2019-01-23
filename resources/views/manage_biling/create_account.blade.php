@extends('layouts.master')
@section('content')
<div id="content-wrapper">
        
    <div class="container">
        <div class="row mt-2 mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <h2 class="_head01">Customers <span>Management</span></h2>
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
                        <h2>Active <span>Customers</span></h2>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="nav flex-column nav-pills CB-account-tab" id="v-pills-tab" role="tablist"
                                aria-orientation="vertical">
                                <a class="nav-link active" id="v-pills-01-tab" data-toggle="pill" href="#v-pills-01"
                                    role="tab" aria-controls="v-pills-01" aria-selected="true">Start Date</a>
                                <a class="nav-link" id="v-pills-02-tab" data-toggle="pill" href="#v-pills-02" role="tab"
                                    aria-controls="v-pills-02" aria-selected="false" style="cursor: default;">Sell Rate</a>
                                <a class="nav-link" id="v-pills-03-tab" data-toggle="pill" href="#v-pills-03" role="tab"
                                    aria-controls="v-pills-03" aria-selected="false" style="cursor: default;">Apply Tax
                                    Rate</a>
                                <a class="nav-link" id="v-pills-04-tab" data-toggle="pill" href="#v-pills-04" role="tab"
                                    aria-controls="v-pills-04" aria-selected="false" style="cursor: default;">Membership
                                    Fee</a>
                                <a class="nav-link" id="v-pills-05-tab" data-toggle="pill" href="#v-pills-05" role="tab"
                                    aria-controls="v-pills-05" aria-selected="false" style="cursor: default;">Security
                                    Deposit</a>
                                <a class="nav-link" id="v-pills-06-tab" data-toggle="pill" href="#v-pills-06" role="tab"
                                    aria-controls="v-pills-06" aria-selected="false" style="cursor: default;">Credit
                                    Limit</a>
                                <a class="nav-link" id="v-pills-07-tab" data-toggle="pill" href="#v-pills-07" role="tab"
                                    aria-controls="v-pills-07" aria-selected="false" style="cursor: default;">Consumption</a>
                                <a class="nav-link" id="v-pills-08-tab" data-toggle="pill" href="#v-pills-08" role="tab"
                                    aria-controls="v-pills-08" aria-selected="false" style="cursor: default;">Delivery
                                    Details</a>
                                <a class="nav-link" id="v-pills-09-tab" data-toggle="pill" href="#v-pills-09" role="tab"
                                    aria-controls="v-pills-09" aria-selected="false" style="cursor: default;">Assets
                                    Issuance</a>
                                <a class="nav-link" id="v-pills-10-tab" data-toggle="pill" href="#v-pills-10" role="tab"
                                    aria-controls="v-pills-10" aria-selected="false" style="cursor: default;">Contract
                                    Copy</a>
                            </div>
                        </div>
                        {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
                        @csrf
                        <div class="col-lg-6 col-md-8 col-sm-12 ml-800">
                            <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-01" role="tabpanel" aria-labelledby="v-pills-01-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Start <span>Date</span></h2>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="PT-10 font12">Start Date</label>
                                                            <div class="form-group" style="height: auto">
                                                                <input type="text" name="start_date" id="start_date"
                                                                    class="form-control datepicker" placeholder="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="button" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-02" role="tabpanel" aria-labelledby="v-pills-02-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Sell <span>Rate</span></h2>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input" type="radio" name="inlineRadioOptions"
                                                                    id="predefined" value='valuable' data-id="predefinedrate" checked>
                                                                <label class="custom-control-label" for="predefined">Select
                                                                    a Predefined Rate</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input" type="radio" name="inlineRadioOptions"
                                                                    id="customrate" value='valuable' data-id="customrate">
                                                                <label class="custom-control-label" for="customrate">Custom
                                                                    Rate</label>
                                                            </div>
                                                        </div>
                                                        <div id = "custom_rate" style = "display:none;"> 
                                                            <div class="col-md-12">
                                                                <hr>
                                                            </div>
                                                            <div class="col-md-6" style="min-width:250px;">
                                                                <div class="form-s2">
                                                                    <select class="form-control formselect" id="predefined_rate" placeholder="select Predefined Rate">
                                                                        <option value="0" disabled selected>Select Predefined Rate</option>
                                                                        <option value="1">Type 1</option>
                                                                        <option value="2">Type 2</option>
                                                                        <option value="3">Type 3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 productRate-table body_asset">
                                                                 {{-- Table --}}
                                                            </div>
                                                            <div style="min-height: 400px" id="dataSidebarLoader_rate" style="display:none;">
                                                                <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-03" role="tabpanel" aria-labelledby="v-pills-03-tab">
                                    <div class="tab-pane fade show active" id="v-pills-01" role="tabpanel"
                                        aria-labelledby="v-pills-01-tab">
                                        <div class="CB_info">
                                            <div id="floating-label" class="card top_border mb-3">
                                                <div class="col-md-12">
                                                    <div class="form-wrap PT-10 PB-20">
                                                        <div class="row">
                                                            <div class="col-md-12 pt-10 mb-10">
                                                                <h2 class="_head04">APPLY <span>TAX RATE</span></h2>
                                                            </div>
                                                           
                                                                <div class="col-md-3">
                                                                    <div class="custom-control custom-radio">
                                                                        <input class="custom-control-input apply_tax_yes" type="radio"
                                                                            name="txt-rate" id="txt-rateY" value='valuable'>
                                                                        <label class="custom-control-label" for="txt-rateY">Yes</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <div class="custom-control custom-radio">
                                                                       
                                                                        <input class="custom-control-input apply_tax_no" type="radio"
                                                                            name="txt-rate" id="txt-ratN" value='valuable' data-id="predefinedrate">
                                                                        <label class="custom-control-label" for="txt-ratN">No</label>
                                                                    </div>
                                                                </div>
                                                            
                                                            <div class="col-md-12">
                                                                <hr class="mb-0">
                                                            </div>
                                                            <div id ="apply_tax" style = "display:none;" class='col-md-12'>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label class="control-label mb-10">GST</label>
                                                                            <input type="number" id="gst_tax" class="form-control"
                                                                                placeholder="">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row m-0 PT-15">
                                                            <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                            <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-04" role="tabpanel" aria-labelledby="v-pills-04-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Membership <span>Fee</span></h2>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label mb-10">Membership Fee</label>
                                                                <input type="number" id="membership_fee" class="form-control"
                                                                    placeholder="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-05" role="tabpanel" aria-labelledby="v-pills-05-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Security <span> Deposit</span></h2>
                                                        </div>
                                                        <div class="col-md-5">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input flat_deposit_btn" type="radio" name="txt-rate" id="securitydeposit" value='valuable' checked>
                                                                <label class="custom-control-label" for="securitydeposit">Flat
                                                                    Security Deposit</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-7">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input deposit_against_products" type="radio" name="txt-rate" id="againstproducts" value='valuable'>
                                                                <label class="custom-control-label" for="againstproducts">Security
                                                                    Deposit Against Products</label>
                                                            </div>
                                                        </div>
                                                        
                                                        <div id="flat_deposit_div" style="display:none;" class="col-md-12">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <hr>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label mb-10">Flat Security
                                                                            Deposit</label>
                                                                        <input type="number" id="flat_deposit_field" class="form-control">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="deposit_against_products_div" style="display:none;" class="col-md-12">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <hr>
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <div class="form-s2">
                                                                        <label class="PT-10 font12">Select Products</label>
                                                                        <select class="form-control sd-type" id="select_products" multiple="multiple">
                                                                            <option value = "0" disabled>Select Products</option>
                                                                            <?php
                                                                                if(!$products->isEmpty()){
                                                                                    foreach($products as $product){ ?>
                                                                                        <option value="<?= $product->id ?>"><?= $product->name ?></option>
                                                                                    <?php }
                                                                                }
                                                                            ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label mb-10">Product Quantity</label>
                                                                        <input type="number" class="form-control" id="product_quantity">
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label mb-10">Product Price</label>
                                                                        <input type="number" id="product_price" class="form-control">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-06" role="tabpanel" aria-labelledby="v-pills-06-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Credit <span> Limit</span></h2>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label mb-10">Total Amount</label>
                                                                <input type="number" id="total_amount" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label mb-10">No. of Days</label>
                                                                <input type="number" id="no_of_days" class="form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-07" role="tabpanel" aria-labelledby="v-pills-07-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Consumption <span></span></h2>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label mb-10">Enter a Limit of
                                                                    Bottles</label>
                                                                <input type="number" id="comsmuption" class="form-control">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-08" role="tabpanel" aria-labelledby="v-pills-08-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Delivery <span>Details</span></h2>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input delivery_detail_radio" type="radio" name="txt-rate" id="weekly" value='weekly'>
                                                                <label class="custom-control-label" for="weekly">Weekly</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input delivery_detail_radio" type="radio" name="txt-rate" id="biweekly" value='biweekly'>
                                                                <label class="custom-control-label" for="biweekly">Bi-weekly</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input delivery_detail_radio" type="radio" name="txt-rate" id="monthly" value='monthly'>
                                                                <label class="custom-control-label" for="monthly">Monthly</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 mt-10">
                                                            <div class="form-s2">
                                                                <label class="PT-10 font12">Week days</label>
                                                                <select class="form-control sd-type" id="select_days" multiple="multiple">
                                                                    <option value="0" disabled>Select week days</option>
                                                                    <option value="Monday">Monday</option>
                                                                    <option value="Tuesday">Tuesday</option>
                                                                    <option value="Wednesday">Wednesday</option>
                                                                    <option value="Thursday">Thursday</option>
                                                                    <option value="Friday">Friday</option>
                                                                    <option value="Saturday">Saturday</option>
                                                                    <option value="Sunday">Sunday</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-09" role="tabpanel" aria-labelledby="v-pills-09-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Assets <span> Issuance</span></h2>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input" type="radio" name="txt-rate"
                                                                    id="assetsY" value='valuable'>
                                                                <label class="custom-control-label" for="assetsY">Yes</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="custom-control custom-radio">
                                                                <input class="custom-control-input" type="radio" name="txt-rate"
                                                                    id="assetsN" value='valuable'checked>
                                                                <label class="custom-control-label" for="assetsN">No</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div class="row" style="display:none;" id="asset_issaunace_div">
                                                                <div class="col-md-12">
                                                                    <hr>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-s2">
                                                                        <select class="form-control formselect" id="asset_type" placeholder="select Assets Type">
                                                                            <option value="0" selected disabled>Select Assets Type</option>
                                                                            <option value="1">Type 1</option>
                                                                            <option value="2">Type 2</option>
                                                                            <option value="3">Type 3</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 productRate-table body_asset_variant">
                                                                    {{-- <table class="table table-hover dt-responsive nowrap" id="example2"
                                                                        style="width:100%">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Qty.</th>
                                                                                <th>Model No</th>
                                                                                <th>Warranty start</th>
                                                                                <th>Purchase Price</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>25</td>
                                                                                <td>model02154ASD</td>
                                                                                <td>1/02/2019</td>
                                                                                <td>4250</td>
                                                                                <td><button class="btn btn-default">Issue</button></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>25</td>
                                                                                <td>model02154ASD</td>
                                                                                <td>1/02/2019</td>
                                                                                <td>4250</td>
                                                                                <td><button class="btn btn-default">Issue</button></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>25</td>
                                                                                <td>model02154ASD</td>
                                                                                <td>1/02/2019</td>
                                                                                <td>4250</td>
                                                                                <td><button class="btn btn-default">Issue</button></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>25</td>
                                                                                <td>model02154ASD</td>
                                                                                <td>1/02/2019</td>
                                                                                <td>4250</td>
                                                                                <td><button class="btn btn-default">Issue</button></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>25</td>
                                                                                <td>model02154ASD</td>
                                                                                <td>1/02/2019</td>
                                                                                <td>4250</td>
                                                                                <td><button class="btn btn-default">Issue</button></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table> --}}
                                                                </div> 
                                                                <div style="min-height: 400px" id="dataSidebarLoader_asset"          style="display:none; ">
                                                                    <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveCurrentData">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-10" role="tabpanel" aria-labelledby="v-pills-10-tab">
                                    <div class="CB_info">
                                        <div id="floating-label" class="card top_border mb-3">
                                            <div class="col-md-12">
                                                <div class="form-wrap PT-10 PB-20">
                                                    <div class="row">
                                                        <div class="col-md-12 pt-10 mb-10">
                                                            <h2 class="_head04">Contract <span> Copy</span></h2>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <label class="font12">Documents Attachment</label>
                                                            <div class="">
                                                                <form action="#" class="dropzone" id="my-awesome-dropzone">
                                                                    {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
                                                                    @csrf
                                                                    <div class="fallback">
                                                                        <input name="documents[]" type="file" id="documents" multiple/>
                                                                    </div>
                                                                    <input type="text" value="<?= $customer_id ?>" hidden name="customer_id"/>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row m-0 PT-15">
                                                        <button type="submit" class="btn btn-primary mr-2 saveWholeForm">Save</button>
                                                        <button type="submit" class="btn btn-cancel mr-2 cancel_btn">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12 col-sm-12">
                            <div class="CBR_info">
                                <h2 class="_head04">Customer <span>Detail</span></h2>
                                <div class="CBR_value"><strong>Tax:</strong><span class="tax_sidebar"> 00</span></div>
                                <div class="CBR_value"><strong>Membership fee:</strong><span class="membership_sidebar"> 00</span></div>
                                <div class="CBR_value"><strong>Total Amount:</strong><span class="total_amount_sidebar"> 00</span></div>
                                <div class="CBR_value"><strong>No. of days:</strong><span class="no_of_days_sidebar"> 00</span></div>
                                <div class="CBR_value"><strong>Consumption:</strong><span class="consumption_sidebar"> 00</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="min-height: 400px" id="dataSidebarLoader" style="display:none;">
                <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
            </div>
        </div>

        {{-- <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <a class="btn add_button openDataSidebarForAddingInventory"><i class="fa fa-plus"></i> Add Inventory</a>
                            <h2>Inventory List</h2>
                        </div>
                        <div style="min-height: 400px" id="tblLoader">
                            <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
                        </div>
                        <div class="body" style="display: none">
                        </div>
                    </div>
                </div>
            </div> --}}
        @endsection


