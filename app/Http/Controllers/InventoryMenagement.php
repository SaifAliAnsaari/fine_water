<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use DB;
use URL;

class InventoryMenagement extends Controller
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

    public function inventory (){
         return view('inventory_managment.inventory_list');
    }

     public function add_inventory(Request $request){
        if(DB::table('inventory_core')->select('id')->where('sku', $request->sku)->first()){
            echo json_encode('already exist');
        }else{

            if($request->hasFile('compPicture')){
                $completeFileName = $request->file('compPicture')->getClientOriginalName();
                $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extension = $request->file('compPicture')->getClientOriginalExtension();
                $compPic = str_replace(' ', '_', $fileNameOnly).'-'. rand() .'_'.time().'.'.$extension;
                $path = $request->file('compPicture')->storeAs('public/inventory', $compPic);
                //$profile->company_logo = $compPic;
                $insert_inventory = DB::table('inventory_core')->insert(
                    ['name' => $request->name, 
                    'liter_capacity' => $request->liter_capacity,
                    'sku' => $request->sku, 
                    'purchase_price' => $request->purchase_price,
                    'returnable' => $request->returnable,
                    'img' => $compPic
                    ]);
                if($insert_inventory){
                    echo json_encode('success');
                }else{
                    echo json_encode('failed');
                }
            }else{
                $insert_inventory = DB::table('inventory_core')->insert(
                    ['name' => $request->name, 
                    'liter_capacity' => $request->liter_capacity,
                    'sku' => $request->sku, 
                    'purchase_price' => $request->purchase_price,
                    'returnable' => $request->returnable
                    ]);
                if($insert_inventory){
                    echo json_encode('success');
                }else{
                    echo json_encode('failed');
                }
            }
        }
     }

    public function inventory_list(){
        echo json_encode( DB::table('inventory_core') ->get());
    }

    public function get_inventory_data($id){
        echo json_encode(array('info' => DB::table('inventory_core')->where("id", $id)->first(), 'base_url' => URL::to('storage/inventory').'/'));
    }

    public function update_inventory(Request $request){
        try{
            if($request->hasFile('compPicture')){

                $completeFileName = $request->file('compPicture')->getClientOriginalName();
                $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extension = $request->file('compPicture')->getClientOriginalExtension();
                $compPic = str_replace(' ', '_', $fileNameOnly).'-'. rand() .'_'.time().'.'.$extension;
                $path = $request->file('compPicture')->storeAs('public/inventory', $compPic);

                if(Storage::exists('public/inventory/'.$request->old_img)){
                    Storage::delete('public/inventory/'.$request->old_img);
                }
                //$profile->company_logo = $compPic;
                $update_inventory = DB::table('inventory_core')
                ->where('id', $request->inventory_id)->update(
                    ['name' => $request->name, 
                    'liter_capacity' => $request->liter_capacity,
                    'sku' => $request->sku, 
                    'purchase_price' => $request->purchase_price,
                    'returnable' => $request->returnable,
                    'img' => $compPic
                    ]);
                    
                echo json_encode('success');
            }else{
                $update_inventory = DB::table('inventory_core')
                ->where('id', $request->inventory_id)->update(
                    ['name' => $request->name, 
                    'liter_capacity' => $request->liter_capacity,
                    'sku' => $request->sku, 
                    'purchase_price' => $request->purchase_price,
                    'returnable' => $request->returnable
                    ]);
                    
                echo json_encode('success');
            }
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    
    }

    public function activate_inventory(Request $request){
        try{
            $active_inventory = DB::table('inventory_core')->where('id', $request->id)
            ->update(
                ['is_active' => 1
                ]);
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
        echo json_encode('success');
    }

    public function deactivate_inventory(Request $request){
        try{
            $active_inventory = DB::table('inventory_core')->where('id', $request->id)
            ->update(
                ['is_active' => 0
                ]);
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
        echo json_encode('success');
    }



    public function add_ons(){
        return view('inventory_managment.add_ons');
    }

    public function add_addOns(Request $request){
        if(DB::table('add_ons')->select('id')->whereRaw('name = "'.$request->name.'" AND quantity = "'.$request->quantity.'" AND purchase_price = "'.$request->purchase_price.'"')->first()){
            echo json_encode('already exist');
        }else{
            $insert_addOns = DB::table('add_ons')->insert(
                ['name' => $request->name, 
                'purchase_price' => $request->purchase_price,
                'quantity' => $request->quantity
                ]);
            if($insert_addOns){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function addOns_list(){
        echo json_encode( DB::table('add_ons') ->get());
    }

    public function get_add_ons_data($id){
        echo json_encode(array('info' => DB::table('add_ons')->where("id", $id)->first()));
    }

    public function update_addOns(Request $request){
        if(DB::table('add_ons')->select('id')->whereRaw('name = "'.$request->name.'" AND quantity = "'.$request->quantity.'" AND purchase_price = "'.$request->purchase_price.'"')->first()){
            echo json_encode('already exist');
        }else{
            try{
                $update_addOns = DB::table('add_ons')
                ->where('id', $request->addOns_id)->update(
                    ['name' => $request->name, 
                    'purchase_price' => $request->purchase_price,
                    'quantity' => $request->quantity
                    ]);
                    
                echo json_encode('success');
                
            } catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
        }
    }

    public function delete_addOns_entry(Request $request){
        $delete_one_entry = DB::table('add_ons')
            ->where('id', $request->id)
            ->delete();
        if($delete_one_entry){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }



    public function stock(){
        return view('inventory_managment.stock_managment'); 
    }

    public function stock_quantity_list(){
        echo json_encode( DB::table('inventory_core as ic')->selectRaw('id,sku, (Select quantity from stock_managment where sku = ic.sku) as quantity')->get());
    }

    public function add_quantity_stock_managment(Request $request){
        $check = DB::table('stock_managment')->select('id', 'quantity')->where('sku', $request->sku)->first();
        if($check){

            try{
                $add = DB::table('stock_managment')
                ->where('sku', $request->sku)->update(
                    ['quantity' => $request->quantity + $check->quantity
                    ]);
                echo json_encode('success');
            }catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
           
        }else{
            $add = DB::table('stock_managment')->insert(
                ['sku' => $request->sku, 
                'quantity' => $request->quantity
                ]);
            if($add){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function remove_quantity_stock_managment(Request $request){

        $check = DB::table('stock_managment')->select('id', 'quantity')->where('sku', $request->sku)->first();
        if(!$check == null){
            $total = $check->quantity - $request->quantity;
            
            if($check->quantity > 0 && $total >= 0){

                try{
                    $add = DB::table('stock_managment')
                    ->where('sku', $request->sku)->update(
                        ['quantity' => $check->quantity - $request->quantity 
                        ]);
                    echo json_encode('success');
                }catch(\Illuminate\Database\QueryException $ex){ 
                    echo json_encode('failed'); 
                }
               
            }else{
                echo json_encode('failed');
            }
        }else{
            echo json_encode('failed');
        }
        
    } 



    public function assests(){
        return view('inventory_managment.assests_management'); 
    }

    public function add_assests_core(Request $request){
        if(DB::table('assest_core')->select('id')->whereRaw('name = "'.$request->name_core.'" AND type = "'.$request->asset_type.'"')->first()){
            echo json_encode('already exist');
        }else{
            $insert_core = DB::table('assest_core')->insert(
                ['name' => $request->name_core, 
                'type' => $request->asset_type
                ]);
            if($insert_core){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function add_assests(Request $request){
         $data_added = [];
        $insert_assest_data = DB::table('assests')->insertGetId(
            ['model_no' => $request->model,
            'serial_no' => $request->serial_no, 
            'purchase_price' => $request->purchase_price,
            'seller' => $request->seller, 
            'warrenty_start' => $request->warrenty_start,
            'warrenty_end' => $request->warrenty_end,
            'manufacture' => $request->manufactures,
            'asset_core_id' => $request->assests_id_for_detail
            ]);
        if($insert_assest_data){
            if($request->hasFile('documents') ){
                foreach($request->file('documents') as $file) :
                    $completeFileName = $file->getClientOriginalName();
                    $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                    $extension = $file->getClientOriginalExtension();
                    $randomized = rand();
                    $documents = str_replace(' ', '', $fileNameOnly).'-'.$randomized.''.time().'.'.$extension;
                    $path = $file->storeAs('public/assest_documents', $documents);
                    $insert_doc = DB::table('assests_documents')->insert([
                        'document' => $documents,
                        'assest_id' => $insert_assest_data
                    ]);
                endforeach;
                if($insert_doc){
                   // echo json_encode("success");
                    $data_added[] = ['doc' => true];
                }else{
                    $data_added[] = ['doc' => false];
                }
            } 
            if($request->hasFile('invoices') ){
                foreach($request->file('invoices') as $file) :
                    $completeFileName = $file->getClientOriginalName();
                    $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                    $extension = $file->getClientOriginalExtension();
                    $randomized = rand();
                    $documents = str_replace(' ', '', $fileNameOnly).'-'.$randomized.''.time().'.'.$extension;
                    $path = $file->storeAs('public/assest_invoice', $documents);
                    $insert_doc = DB::table('assests_invoice')->insert([
                        'invoice' => $documents,
                        'assest_id' => $insert_assest_data
                    ]);
                endforeach;
                if($insert_doc){
                    $data_added[] = ['invoice' => true];
                }else{
                    $data_added[] = ['invoice' => false];
                }
            }
            if($request->hasFile('pictures') ){
                foreach($request->file('pictures') as $file) :
                    $completeFileName = $file->getClientOriginalName();
                    $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                    $extension = $file->getClientOriginalExtension();
                    $randomized = rand();
                    $documents = str_replace(' ', '', $fileNameOnly).'-'.$randomized.''.time().'.'.$extension;
                    $path = $file->storeAs('public/assest_pictures', $documents);
                    $insert_doc = DB::table('assests_pics')->insert([
                        'pic' => $documents,
                        'assest_id' => $insert_assest_data
                    ]);
                endforeach;
                if($insert_doc){
                    $data_added[] = ['pic' => true];
                }else{
                    $data_added[] = ['pic' => false];
                }

            }
            else{
                $data_added[] = ['asset' => true];
            }
        }else{
            $data_added[] = ['asset' => false];
        }
        echo json_encode($data_added);
    }

    public function assests_list(){
        echo json_encode( DB::table('assest_core as core')->selectRaw('id, name, type, (Select COUNT(*) from assests where asset_core_id = core.id) as total_qty')->get()); 
    }

    public function get_asset_detail($id){
        echo json_encode(array('info' => DB::table('assest_core')->where("id", $id)->first()));
    }

    public function get_assests_data($id){
        //echo json_encode(array('info' => DB::table('assests')->where('id', $id)->first()));
        echo json_encode(array('info' => DB::table('assests as asset')->selectRaw('id, serial_no, model_no, purchase_price, seller, warrenty_start, warrenty_end, manufacture, asset_core_id, (Select name from assest_core where id = asset.asset_core_id) as name')->where("id", $id)->first()));
    }

    public function update_assests(Request $request){
        try{
            $update_assest = DB::table('assests')
            ->where('id', $request->asset_id_to_updateAsset)->update(
                ['purchase_price' => $request->purchase_price,
                'serial_no' => $request->serial_no,
                'model_no' => $request->model,
                'seller' => $request->seller,
                'warrenty_start' => $request->warrenty_start,
                'warrenty_end' => $request->warrenty_end,
                'manufacture' => $request->manufactures
                ]);
                
            echo json_encode('success');
            
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    }

    public function delete_assest_entry(Request $request){
        $data = [];
        $delete_one_entry = DB::table('assests')
        ->where('id', $request->id)
        ->delete();
        if($delete_one_entry){
            $data[] = ['asset' => 'success'];
            if(DB::table('assests_pics')->select('id')->where('assest_id', $request->id)->get()){
                $delete_pic_entry = DB::table('assests_pics')
                ->where('assest_id', $request->id)
                ->delete();
                if($delete_pic_entry){
                    $data[] = ['pic' => 'success'];
                }else{
                    $data[] = ['pic' => 'success'];
                }
            }
            if(DB::table('assests_invoice')->select('id')->where('assest_id', $request->id)->get()){
                $delete_invoice_entry = DB::table('assests_invoice')
                ->where('assest_id', $request->id)
                ->delete();
                if($delete_invoice_entry){
                    $data[] = ['invoice' => 'success'];
                }else{
                    $data[] = ['invoice' => 'failed'];
                }
            }
            if(DB::table('assests_documents')->select('id')->where('assest_id', $request->id)->get()){
                $delete_doc_entry = DB::table('assests_documents')
                ->where('assest_id', $request->id)
                ->delete();
                if($delete_doc_entry){
                    $data[] = ['doc' => 'success'];
                }else{
                    $data[] = ['doc' => 'failed'];
                }
            }
        }else{
            $data[] = ['asset' => 'failed'];
        }
        echo json_encode($data);
        
    }




    public function update_asset_page($id){
        //$asset_data = DB::table('assests')->where('asset_core_id', $id)->get();
        return view('inventory_managment.update_asset', ['id' => $id]);
    }

    public function assests_list_to_update(Request $request){
        echo json_encode(DB::table('assests')->where('asset_core_id', $request->id)->get());
    }

}
