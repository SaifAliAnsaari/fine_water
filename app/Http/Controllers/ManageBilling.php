<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use DB;
use URL;

class ManageBilling extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function select_customer (){
        return view('manage_biling.customers_list');
    }

    public function create_account($id){
        $asset_type = DB::table('assest_core')->select('type')->get();
        //inventory
        $select_product = DB::table('inventory_core')->select('id', 'name')->get();
        if(DB::table('customers')->whereRaw('id = "'.$id.'" AND is_active = 1')->first()){
            return redirect('/select_customer');
        }else{
            return view('manage_biling.create_account', ['customer_id'=>$id, 'asset_types'=>$asset_type, 'products'=>$select_product]);
        }
    }

    public function asset_list_to_add_rate(Request $request){
        echo json_encode( DB::table('assest_core as core')->select('id', 'name')->where('type', $request->type)->get()); 
    }

    public function add_rate_against_customer(Request $request){
        if(DB::table('custom_rates')->whereRaw('product_id = "'.$request->id.'" AND customer_id = "'.$request->customer_id.'"')->first()){
            try{
                $update_rate = DB::table('custom_rates')->whereRaw('product_id = "'.$request->id.'" AND customer_id = "'.$request->customer_id.'"')->update(
                    ['product_rate' => $request->rate
                    ]);
            }catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
            echo json_encode('success');
        }else{
            $insert_rate = DB::table('custom_rates')->insert(
                ['product_id' => $request->id, 
                'product_rate' => $request->rate,
                'customer_id' => $request->customer_id
                ]);
            if($insert_rate){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function asset_list_to_issue(Request $request){
        echo json_encode( DB::table('assests as asset')->whereRaw('asset_core_id IN (Select id from assest_core where type = "'.$request->type.'")')->get()); 
    }

    public function issue_asset_to_customer(Request $request){
        $issue_asset = DB::table('assets_issuance')->insert(
            ['asset_id' => $request->asset_id,
            'customer_id' => $request->customer_id
            ]);
        if($issue_asset){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }

    public function addBilling(Request $request){
        //echo json_encode(count($issuence)); die;
        $issue_asset = DB::table('billing')->insert(
            ['start_date' => $request->start_date,
            'gst' => $request->gst_tax,
            'membership_fee' => $request->membership_fee,
            'flat_security_deposite' => $request->flat_deposit_field,
            'no_of_days' => $request->no_of_days,
            'total_amount' => $request->total_amount,
            'consumption' => $request->comsmuption,
            'delivery_details' => $request->delivery_detail_radio,
            'week_days' => $request->select_days
            ]);
        if($issue_asset){
            if($request->select_products != ""){
                $products =  explode(',', $request->select_products);
                foreach ($products as $product) {
                    $add_products = DB::table('security_deposit_against_products')->insert(
                        ['product_id' => $product,
                        'customer_id' => $request->customer_id,
                        'quantity' => $request->product_quantity,
                        'price' => $request->product_price
                        ]);
                }
            }
            try{
                $update_customer = DB::table('customers')->where('id', $request->customer_id)->update(
                    ['is_active' => 1]);
                if(count($request->asset_issaunce_array) > 0){
                    foreach($request->asset_issaunce_array as $_assets){
                        //echo json_encode('here');die;
                        $insert_assets = DB::table('assets_issuance')->insert([
                            'customer_id' => $_assets['customer_id'],
                            'asset_id' => $_assets['asset_id']
                        ]);
                    }
                }
                if(count($request->custom_rate_array) > 0){
                    foreach($request->custom_rate_array as $rates){
                        $insert_rates = DB::table('custom_rates')->insert([
                            'product_id' => $rates['product_id'],
                            'product_rate' => $rates['value'],
                            'customer_id' => $rates['customer_id']
                        ]);
                    }
                }
            } catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
            echo json_encode('success');
            
        }else{
            echo json_encode('failed');
        }
    }

    public function add_document(Request $request){
        if($request->hasFile('documents')){
            foreach($request->file('documents') as $file) :
                $completeFileName = $file->getClientOriginalName();
                $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extension = $file->getClientOriginalExtension();
                $randomized = rand();
                $documents = str_replace(' ', '', $fileNameOnly).'-'.$randomized.''.time().'.'.$extension;
                $path = $file->storeAs('public/billing_documents', $documents);
                $insert_doc = DB::table('billing_documents')->insert([
                    'document' => $documents,
                    'customer_id' => $request->customer_id
                ]);
            endforeach;
            //$insert_doc ? echo json_encode('success'); : echo json_encode('failed');
            if($insert_doc){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function CustomersListBilling(){
        echo json_encode( DB::table('customers as cust')->select('id', 'company_name', 'company_poc', 'latitude', 'longitude', 'customer_type', 'country', DB::raw('IFNULL((SELECT company_name from customers where id = cust.parent_company), "NA") as parent_company'))->where('is_active', 0)->get());
    }
}
