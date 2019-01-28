@extends('layouts.master')



@section('content')

<div class="row mt-2 mb-3">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <h2 class="_head01">Product <span>Management</span></h2>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <ol class="breadcrumb">
            <li><a href="#"><span>Rate</span> List</a></li>
            <li><span>Active</span></li>
        </ol>
    </div>
</div>
<div class="row mt-2 mb-3">
    <div class="col-lg-4 col-md-4 col-sm-4">
        <div class="form-group">
            <label class="control-label mb-10">Rate Title*</label>
            <input type="text" name="rate_title" id="rate_title" class="form-control" placeholder="" required>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <h2>Rate <span>List</span></h2>
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