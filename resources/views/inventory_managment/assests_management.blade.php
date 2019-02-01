@extends('layouts.master')


@section('data-sidebar')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl close_btn"></a>
    <div class="pro-header-text">Assests <span>Managment</span></div>
    <div style="min-height: 400px" id="dataSidebarLoader" style="display: none">
        <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
    </div>
    <div class="pc-cartlist">
        <form style="display: flex; width:100%" id="saveAssestsForm">
            {!! Form::hidden('product_updating_id', '') !!}
            {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
            @csrf
            <input type="text" id="operation" hidden>
            <div class="overflow-plist">
                <div class="plist-content">
                    <div class="_left-filter" style="padding-top:30px">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">
                                        <input hidden type="text" name="assests_id" value = "">
                                        <input hidden type="text" name="assests_id_for_detail" value = "abc">
                                        <h2 class="_head03 PT-10">Add <span> Assests</span></h2>
                                        <div class="form-wrap p-0">

                                            <div class = "asset_core">
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Assest Name*</label>
                                                            <input type="text" name="name_core" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6 pt-19">
                                                        <div class="form-s2">
                                                            <select class="form-control formselect" name="asset_type" placeholder="Select Asset Type">
                                                                <option value="0" disabled selected>Select Asset Type*</option>
                                                                <option value="1" >Type 1</option>
                                                                <option value="2" >Type 2</option>
                                                                <option value="3" >Type 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class = "asset_detail" style = "display:none;">
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Assest Name*</label>
                                                            <input type="text" disabled name="name" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Serial NO*</label>
                                                            <input type="number" name="serial_no" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Model NO*</label>
                                                            <input type="text" name="model" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Manufacturer*</label>
                                                            <input type="text" name="manufactures" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Purchase Price*</label>
                                                            <input type="number" name="purchase_price" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Seller*</label>
                                                            <input type="text" name="seller" class="form-control" placeholder="" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <label class="PT-10 font12">Warrenty Start*</label>
                                                        <div class="form-group" style="height: auto">
                                                            <input type="text" name="warrenty_start" class="form-control datepicker" placeholder="">
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6">
                                                        <label class="PT-10 font12">Warrenty End*</label>
                                                        <div class="form-group" style="height: auto">
                                                            <input type="text" name="warrenty_end" class="form-control datepicker" placeholder="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Multiple documents*</label>
                                                            <input name="documents[]" type="file" class="dropzone" multiple />
                                                        </div>
                                                    </div>
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Purchase Invoice*</label>
                                                            <input name="invoices[]" type="file" class="dropzone" multiple />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class = "col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label mb-10">Multiple Pics*</label>
                                                            <input name="pictures[]" type="file" class="dropzone" multiple />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                           
                                            {{-- <div class="row">
                                                <div class="col-md-12">
                                                <label class="font12 pt-19">Documents Attachment</label>
                                                    <div class="">
                                                        <form action="#" class="dropzone" id="my-awesome-dropzone" >
                                                            <div class="fallback">
                                                                <input name="file" type="file" multiple />
                                                            </div>
                                                        </form>
                                                       
                                                    </div>
                                                </div> 
                                            </div> --}}
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
        <button type="submit" class="btn btn-primary mr-2" id="saveAssests_core">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="saveAssests" style = "display:none;">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="updateAssests" style = "display:none;">Update</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2" id="cancelAssests">Cancel</button>
    </div>
</div>
@endsection


@section('content')
<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Assests</h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Assests</span></a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <a class="btn add_button openDataSidebarForAddingInventory"><i class="fa fa-plus"></i> Add Assests</a>
                <h2>Assests List</h2>
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