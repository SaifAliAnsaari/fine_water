@extends('layouts.master')
@section('content')

<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
	  <div class="modal-content top_border">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Order <span>Detail</h5>
			  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			  </button>
			</div>
			<div class="modal-body OR-ListView" style="width:100%;">
				   <table class="table table-hover dt-responsive nowra" id="example2">
					<thead>
					  <tr class="table_head">
						<th>Product</th>
						<th>Sold QTY.</th>
						<th>Return QTY.</th>
						<th>Amount</th>
						<th>Action</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>Product Name</td>
						<td>8</td>
						<td>6</td>
						<td>350</td>
						<td><button class="btn btn-default red-bg" title="Delete">Delete</button></td>
					  </tr>
					  
					  <tr>
						<td>Product Name</td>
						<td>8</td>
						<td>6</td>
						<td>150</td>
						<td><button class="btn btn-default red-bg" title="Delete">Delete</button></td>
					  </tr>
					  
					  <tr>
						<td>Product Name</td>
						<td>8</td>
						<td>6</td>
						<td>120</td>
						<td><button class="btn btn-default red-bg" title="Delete">Delete</button></td>
					  </tr>
					  
					  <tr>
						<td>Product Name</td>
						<td>8</td>
						<td>6</td>
						<td>80</td>
						<td><button class="btn btn-default red-bg" title="Delete">Delete</button></td>
					  </tr>
					  
					  <tr>
						<td>Product Name</td>
						<td>8</td>
						<td>6</td>
						<td>250</td>
						<td><button class="btn btn-default red-bg" title="Delete">Delete</button></td>
					  </tr>
					</tbody>
				  </table>
	  
							
			</div>
			<div class="modal-footer border-0">
	   
			  <button type="submit" class="btn btn-cancel" data-dismiss="modal" aria-label="Close">Close</button>
			</div>
		  </div>
		</div>
	  </div>

<div id="content-wrapper">

        <div class="container">     
           
        <div class="row mt-2 mb-3">        
				<div class="col-lg-6 col-md-6 col-sm-6">
					<h2 class="_head01">Order <span>Management</span></h2>
				</div>
				
				<div class="col-lg-6 col-md-6 col-sm-6">
					<ol class="breadcrumb">
						<li><a href="#"><span>Create </span></a></li>
						<li><span>Order</span></li>
					</ol>
				</div>
		</div>
		
		<div class="row">
		<div class="col-md-12 position-relative">			    	
			    	<div class="card">
		    	 	<div class="header">		    	 			      	
		    	 	<h2>Create <span> Order</span></h2>
		    	 	</div>
		    	 	
		<div class="body">	
		
		<div class="row">    		
    		<div class="col-12">
    		 <div id="floating-label">
					   <div class="form-wrap p-0">	
						  <div class="row">
						  <div class="col-md-4">
					      		<div class="form-group" style="height: auto">
								<input type="text" id="datepicker" class="form-control" placeholder="" value="Select Date">
								</div>
							</div>
				
							<div class="col-md-4">
							<div class="form-s2 mb-10">
									  <select class="form-control formselect" id="delivery_team" placeholder="Select Delivery Team">
										<option value="0" disabled selected>Select Delivery Team</option>
										<?php 
											if(!$delivery_team->isEmpty()){
												foreach($delivery_team as $team){ ?>
													<option value="<?= $team->id ?>"><?= $team->team_name ?></option>
												<?php }
											}
										?> 
									  </select>
							</div>
							</div>
							
							<div class="col-md-4">
							<div class="form-s2">
									  <select class="form-control formselect" id="route" placeholder="Select Route">
										<option value="0" disabled selected>Select Route</option>
										<?php
											if(!$zone->isEmpty()){
												foreach($zone as $zone){ ?>
													<option value="<?= $zone->id ?>"><?= $zone->zone_name ?></option> 
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
    
       <h2 class="_head03 mt-15">Add <span> Order</span></h2>
       
       		<div class="row">    		
    		<div class="col-12">
    		 <div id="floating-label">
					   <div class="form-wrap _addOrderSec">	
						  <div class="row">
							<div class="col-md-4">
							<div class="form-s2">
									  <select class="form-control formselect" id="select_cust" placeholder="Select Customer">
										<option value="0" disabled selected>Select Customer</option>
										<?php 
											if(!$customers->isEmpty()){
												foreach($customers as $cust){ ?>
													<option value="<?= $cust->id ?>"><?= ($cust->company_name != null ? $cust->company_name: ($cust->organization_name != null ? $cust->organization_name : $cust->merchant_name)) ?></option>
												<?php }
											}
										?> 
									  </select>
							</div>
							</div>	
							<div class="col-md-8">
							   <button type="submit" class="btn btn-primary mr-2 font12 h-35 add_product_btn">Add Product</button>
							   {{-- <button type="submit" class="btn btn-primary mr-2 font12 h-35 add_payment">Add Payment</button> --}}
							</div>
					  
						  </div>
						  <br><br><br>
						  
						  <div class="row select_products_for_order" style ="display:none;"> 
							  
						  	<div class="col-md-4">
							<div class="form-s2 pt-19">
									  <select class="form-control formselect" id="select_pro" placeholder="Select Product">
										<option value="0" disabled selected>Select Product</option>
										<?php
											if(!$products->isEmpty()){
												foreach($products as $pro){ ?>
													<option value="<?= $pro->id ?>" name="<?= $pro->name ?>"><?= $pro->name ?></option>
												<?php }
											}
										?> 
									  </select>
							</div>
							</div>
							 <div class="col-md-3">
								  <div class="form-group">
									<label class="control-label mb-10">Sold QTY.</label>
									<input type="text" id="sold_qty" class="form-control" placeholder="">
								  </div>
								</div>
								
							 <div class="col-md-3">
								  <div class="form-group">
									<label class="control-label mb-10">Return QTY.</label>
									<input type="text" id="return_qty" class="form-control" placeholder="">
								  </div>
								</div>
								
								<div class="col-md-2 pt-19">
								  <button type="submit" class="btn btn-primary mr-2 font12 h-35 add_order">Add Order</button>
								</div>
								
								  <div class="col-md-12"><hr></div>								  
		
						  </div>
						  
						   <div class="col-12 showlisting" style ="display:none;">
						   
						  {{-- <div class="row alert alert-color _add-list" role="alert">
							  <div class="col-md-6"><strong>Product:</strong> Bottle Large </div>
							  <div class="col-md-3"><strong>Sold QTY:</strong> 25 </div>
							  <div class="col-md-3"><strong>Return QTY:</strong> 254 </div>
							  <button type="button" class="close alert_close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span> </button>
						  </div> --}}
						  
						  
						  </div>
						  <div class="col-md-12 pt-19 text-center process_btn" style = "display:none;">
								<button type="submit" class="btn btn-primary font12 h-35 process_order">Process</button>
						</div>
						  
						  <br><br>
						   
						   <div class="row add_payment_div" style="display:none;">
						   <div class="col-md-12"><hr></div>
						   <div class="col-md-3">
								  <div class="form-group">
									<label class="control-label mb-10">Payment</label>
									<input type="number" id="total_payment" class="form-control" placeholder="">
								  </div>
						   </div>
						   
						   <div class="col-md-3 pt-19">
 
									<button type="submit" class="btn btn-primary font12 h-35 add_payment_btn">Add Payment</button> 
 
						   </div>
						   </div>
						  
		 

						  
 
				   
 
	   </div>
					   
					   
 

			</div>
			
			</div>
		</div>	
  
	    
	   <div class="row"> 	 		
	   <div class="col-lg-9 col-md-8 col-sm-12 body_table" >
	   <h2 class="_head03 mt-15 mb-10">Order <span> List</span></h2>
	   
		{{-- <table class="table table-hover dt-responsive nowrap cell-border" id="example" style="width:100%">
        <thead>
            <tr class="table_head">
                <th>Order Id</th>
                <th>Customer</th>
                <th>Receive Payment</th>
                <th>Action</th> 
            </tr>
 
        </thead>
        <tbody> 
             <tr>
                <td>5455</td>      
                <td>Rasheed Khan</td>                
                <td>25000</td>
                <td>
                <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				<button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5455</td>  
                <td>Akram Khan</td>  
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5456</td>  
                <td>Sakandar Khan</td>      
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5457</td>  
                <td>Juli Khan</td>   
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5458</td>  
                <td>Rafi Khan</td>        
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            <tr>
                <td>5459</td>  
                <td>Akram Khan</td>   
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5410</td>  
                <td>Sakandar Khan</td>  
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5411</td>  
                <td>Juli Khan</td>     
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5412</td>  
                <td>Rafi Khan</td>    
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            <tr>
                <td>5454</td>  
                <td>Akram Khan</td> 
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5455</td>  
                <td>Sakandar Khan</td>   
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5455</td>  
                <td>Juli Khan</td>     
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
            <tr>
                <td>5455</td>  
                <td>Rafi Khan</td>  
                <td>25000</td>
                <td>
                 <button class="btn btn-default" title="View Detail" data-toggle="modal" data-target=".bd-example-modal-lg">View Detail</button>
				 <button class="btn btn-default red-bg" title="Delete">Delete</button>
                </td>
            </tr>
            
 
        </tbody>
        
        </table> --}}
       </div>
 	   
 	   <div class="col-lg-3 col-md-4 col-sm-12 _graybg">
 
		<h2 class="_head03 mt-15 mb-10">Load Sheet <span> Detail</span></h2> 
						
			<div class="_order-bg">
 
			<div class="order_value">Custumer Visited: <strong>35</strong></div>
			<div class="order_value">Total Sold Products: <strong>1524</strong></div>
			<div class="order_value">Total Return Products: <strong>1524</strong></div>
			<div class="order_value">Amount Received: <strong>3548</strong></div>			
			<div>
			<button type="submit" class="btn btn-primary mr-2 font12 mt-15">Process</button>
		    <button type="submit" class="btn btn-cancel mr-2 font12 mt-15">Clear All</button>	
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

@endsection