@extends('layouts.master')


@section('data-sidebar')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">Add-Ons <span></span></div>
    <div style="min-height: 400px" id="dataSidebarLoader" style="display: none">
        <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
    </div>
    <div class="pc-cartlist">
        <form style="display: flex; width:100%" id="saveAddOnsForm">
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
                                        <input hidden type="text" name="addOns_id" value = "">
                                        <h2 class="_head03 PT-10">Add <span> Add-Ons</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class = "col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Name*</label>
                                                        <input type="text" name="name" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class = "col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Quantity*</label>
                                                        <input type="number" name="quantity" class="form-control" placeholder="" required>
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
        <button type="submit" class="btn btn-primary mr-2" id="saveAddOns">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="updateAddOns" style = "display:none;">Update</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2" id="cancelAddOns">Cancel</button>
    </div>
</div>
@endsection


@section('content')
<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Add-Ons</h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Add-Ons</span></a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <a class="btn add_button openDataSidebarForAddingInventory"><i class="fa fa-plus"></i> Add Add-Ons</a>
                <h2>Add-Ons List</h2>
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