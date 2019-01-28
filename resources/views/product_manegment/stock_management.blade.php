@extends('layouts.master')



@section('content')
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content top_border">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add <span>Filled Quantity</span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
                <div class="col-md-12">
                    <div  class="form-group">
                        <label class="control-label mb-10">Filled Quantity</label>
                        <input type="text" id="filled_bottles_quantity" class="form-control">
                    </div>
                </div>
                        
        </div>
        <div class="modal-footer border-0">
    
            <button type="submit" class="btn btn-cancel" id="cancel_btn_modal" data-dismiss="modal" aria-label="Close">Close</button>
            <button type="button" class="btn btn-primary" id="add_filled_bottles_modal">Add</button>
            <button  class="btn btn-default" id="open_modal" hidden data-toggle="modal" data-target="#exampleModal">Add</button>
        </div>
        </div>
    </div>
</div>

<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Product <span>Management</span></h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Product</span> Stock</a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <h2>Product <span>Stock</span></h2>
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