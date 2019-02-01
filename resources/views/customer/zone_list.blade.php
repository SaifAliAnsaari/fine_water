@extends('layouts.master')

@section('data-sidebar')

<div id="content-wrapper">

    <div class="container">     
       
    <div class="row mt-2 mb-3">        
            <div class="col-lg-6 col-md-6 col-sm-6">
                <h2 class="_head01">Customers <span>Management</span></h2>
            </div>
            
            <div class="col-lg-6 col-md-6 col-sm-6">
                <ol class="breadcrumb">
                    <li><a href="#"><span>Customers</span></a></li>
                    <li><span>Zone</span></li>
                </ol>
            </div>
    </div>
    
    <div class="row">
    <div class="col-md-12">			    	
        <div class="card">
            <div class="header">
                <h2>Zone <span>List</span></h2>
            </div>
            <div class="body">		    	 		
            {{-- Table --}}
            </div>
                 
            <div style="min-height: 400px" id="tblLoader">
                <img src="/images/loader.gif" width="30px" height="auto" style="position: absolute; left: 50%; top: 45%;">
            </div>    
        </div>
    
    </div>
        
 
    </div>
     

    <footer class="sticky-footer">
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          2019 Sell3sixty All rights reserved
        </div>
      </div>
    </footer>

  </div>
 

</div>

@endsection