@extends('layouts.master')


@section('data-sidebar')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span>Inventory</span></div>
    <div style="min-height: 400px" id="dataSidebarLoader" style="display: none">
        <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
    </div>
    <div class="pc-cartlist">
        <form style="display: flex; width:100%" id="saveInventoryForm">
            {!! Form::hidden('product_updating_id', '') !!}
            {!! Form::hidden('tokenForAjaxReq', csrf_token()) !!}
            @csrf
            <input type="text" id="operation" hidden>
            <div class="overflow-plist">
                <div class="plist-content">
                    <div class="_left-filter" style="padding-top:20px">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">
                                        <input hidden type="text" name="inventory_id" value = "">
                                        <input hidden type="text" name="old_img" value = "">
                                        <h2 class="_head03 PT-10">Add <span> Inventory</span></h2>
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
                                                        <label class="control-label mb-10">Liter Capacity*</label>
                                                        <input type="number" name="liter_capacity" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class = "col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">SKU*</label>
                                                        <input type="text" name="sku" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                                <div class = "col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Purchase Price*</label>
                                                        <input type="number" name="purchase_price" class="form-control" placeholder="" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                {{-- <p style ="margin-top:10px;">Returnable*</p> --}}
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                        <label class="font12">Returnable*</label>
                                                    <div class="form-s2">
                                                        
                                                        <select id="returnable" class="form-control formselect" name="returnable" placeholder="Select Returnable">
                                                            <option value="-1" disabled selected>Returnable</option>
                                                            <option value="1" >Yes</option>
                                                            <option value="0" >No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class = "row">
                                                <div class="col-md-6">
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
            </div>
        </form>
    </div>
    <div class="_cl-bottom">
        <button type="submit" class="btn btn-primary mr-2" id="saveinventory">Save</button>
        <button type="submit" class="btn btn-primary mr-2" id="updateinventory" style = "display:none;">Update</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2" id="cancelinventory">Cancel</button>
    </div>
</div>
@endsection


@section('content')
<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Inventory</h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Inventory</span></a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
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
</div>
@endsection