<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ProductManegment extends Controller
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

    public function add_product(){
        return view('product_manegment.rate_list');
    }

    public function GetRateList(){
        echo json_encode(DB::table('rate_list')->groupBy('rate_title')->get());
    }



    public function add_rate(){
        return view('product_manegment.add-product_rate');
    }

    public function GetInventoryListToAddRate(){
        echo json_encode(DB::table('inventory_core')->selectRaw('id, name, purchase_price')->orderBy('id')->get());
    }

    public function Add_sell_price_inventory(Request $request){
        // $check = DB::table('inventory_core')->select('sell_price')->where('id', $request->id)->first();
        // if($check){
        //     try{
        //         $update = DB::table('inventory_core')
        //         ->where('id', $request->id)->update(
        //             ['sell_price' => $request->sell_price + $check->sell_price
        //             ]);
        //         echo json_encode('success');
        //     }catch(\Illuminate\Database\QueryException $ex){ 
        //         echo json_encode('failed'); 
        //     }
           
        // }else{
        //     $add = DB::table('inventory_core')->insert(
        //         ['sell_price' => $request->sell_price
        //         ]);
        //     if($add){
        //         echo json_encode('success');
        //     }else{
        //         echo json_encode('failed');
        //     }
        // }
        $check = DB::table('rate_list')->select('id', 'sell_price')->whereRaw('rate_title = "'.$request->rate_title.'" AND product_id = "'.$request->id.'"')->first();
        if($check){
            try{
                $update = DB::table('rate_list')
                ->whereRaw('rate_title = "'.$request->rate_title.'" AND product_id = "'.$request->id.'"')->update(
                    ['sell_price' => $request->sell_price + $check->sell_price
                    ]);
                echo json_encode('success');
            }catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
           
        }else{
            $add = DB::table('rate_list')->insert(
                ['sell_price' => $request->sell_price,
                'product_id' => $request->id,
                'rate_title' => $request->rate_title
                ]);
            if($add){
                echo json_encode('success');
            }else{
                echo json_encode('failed');
            }
        }
    }

    public function Remove_price_Inventory(Request $request){
        // $check = DB::table('inventory_core')->select('sell_price')->where('id', $request->id)->first();
        // if(!$check == null){
        //     $total = $check->sell_price - $request->sell_price;
            
        //     if($check->sell_price > 0 && $total >= 0){

        //         try{
        //             $update = DB::table('inventory_core')
        //             ->where('id', $request->id)->update(
        //                 ['sell_price' => $total
        //                 ]);
        //             echo json_encode('success');
        //         }catch(\Illuminate\Database\QueryException $ex){ 
        //             echo json_encode('failed'); 
        //         }
               
        //     }else{
        //         echo json_encode('failed');
        //     }
        // }else{
        //     echo json_encode('failed');
        // }
        $check = DB::table('rate_list')->select('sell_price')->whereRaw('rate_title = "'.$request->rate_title.'" AND product_id = "'.$request->id.'"')->first();
        if(!$check == null){
            $total = $check->sell_price - $request->sell_price;
            
            if($check->sell_price > 0 && $total >= 0){

                try{
                    $update = DB::table('rate_list')
                    ->whereRaw('rate_title = "'.$request->rate_title.'" AND product_id = "'.$request->id.'"')->update(
                        ['sell_price' => $total
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


    public function stock_managment(){
        return view('product_manegment.stock_management');
    }

    public function GetInventoryListStockManagement(){
        echo json_encode(DB::table('inventory_core as ic')->selectRaw('id, sku, name, filled_bottles, (Select quantity from stock_managment where sku = ic.sku) as quantity')->get());
    }

    public function add_filled_bottle_quantity(Request $request){
        // $get_stock_quantity = DB::table('stock_managment')->select('quantity', 'filled_bottles')->where('id', $request->product_id)->first();
        // $total = $request->filled_quantity + $get_stock_quantity->filled_bottles;
        // if($total > $get_stock_quantity->quantity){
        //     echo json_encode('failed');
        // }else{
        //     try{
        //         $update = DB::table('stock_managment')
        //         ->where('id', $request->product_id)->update(
        //             ['filled_bottles' => $total
        //             ]);
        //         echo json_encode('success');
        //     }catch(\Illuminate\Database\QueryException $ex){ 
        //         echo json_encode('failed'); 
        //     }
        // }
        $get_stock_quantity = DB::table('inventory_core')->selectRaw('filled_bottles, (Select quantity from stock_managment where sku = (Select sku from inventory_core where id = "'.$request->product_id.'")) as quantity')->where('id', $request->product_id)->first();
        $total = $request->filled_quantity + $get_stock_quantity->filled_bottles;
        if($total > $get_stock_quantity->quantity){
            echo json_encode('failed');
        }else{
            try{
                $update = DB::table('inventory_core')
                ->where('id', $request->product_id)->update(
                    ['filled_bottles' => $total
                    ]);
                echo json_encode('success');
            }catch(\Illuminate\Database\QueryException $ex){ 
                echo json_encode('failed'); 
            }
        }
           
    }
}
