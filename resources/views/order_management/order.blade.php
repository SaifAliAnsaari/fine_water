@extends('layouts.master')
@section('content')

<div id="content-wrapper">         
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
									  <select class="form-control formselect" placeholder="Select Delivery Team">
										<option>Select Delivery Team</option>
										<option>Delivery Team 1</option>
										<option>Delivery Team 2</option> 
										<option>Delivery Team 3</option>
										<option>Delivery Team 4</option>  
									  </select>
							</div>
							</div>
							
							<div class="col-md-4">
							<div class="form-s2">
									  <select class="form-control formselect" placeholder="Select Zone">
										<option>Select Zone</option>
										<option>Route 1</option>
										<option>Route 2</option> 
										<option>Route 3</option>
										<option>Route 4</option>  
									  </select>
							</div>
							</div>	
					  
						  </div>
					   </div>
			</div>
			
			</div>
		</div>	
	    
	   <div class="row"> 	 		
	   <div class="col-lg-9 col-md-8 col-sm-12">
	   <h2 class="_head03 mt-15 mb-10">Add  <span>Order</span></h2>
	   
        
            <div class="body" style="width: 200px;">
                {{-- Table --}}
            </div>
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

@endsection