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
                    'quantity' => $request->quantity,
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
                    'returnable' => $request->returnable,
                    'quantity' => $request->quantity
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
                    'quantity' => $request->quantity,
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
                    'returnable' => $request->returnable,
                    'quantity' => $request->quantity
                    ]);
                    
                echo json_encode('success');
            }
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    
    }

    public function delete_inventory_entry(Request $request){
        $delete_one_entry = DB::table('inventory_core')
            ->where('id', $request->id)
            ->delete();
        if($delete_one_entry){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
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

}
