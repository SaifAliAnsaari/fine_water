<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class OrderManagement extends Controller
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

    public function order(){
        $delivery_team = DB::table('delivery_team')->select('id', 'team_name')->get();
        $zone = DB::table('zone_info')->get();
        $customers = DB::table('customers')->select('company_name', 'organization_name', 'merchant_name', 'id')->get();
        $products = DB::table('inventory_core')->select('id', 'name')->get();
        return view('order_management.order', ['delivery_team' => $delivery_team, 'customers' => $customers, 'zone' => $zone, 'products' => $products]);
    }

    public function GetCustomersAndOrders(){
        echo json_encode(DB::table('order_core as oc')->selectRaw('id, customer_id, price, (Select company_name from customers where id = oc.customer_id) as company_name, (Select organization_name from customers where id = oc.customer_id) as organization_name, (Select merchant_name from customers where id = oc.customer_id) as merchant_name')->get());
    }

    public function place_order(Request $request){
        //echo json_encode($request->place_order_array); die;
        $place_order_core = DB::table('order_core')->insertGetId(
            ['date' => $request->date,
            'delivery_team' => $request->delivery_team, 
            'zone' => $request->zone,
            'customer_id' => $request->customer, 
            'price' => $request->price
            ]);
        if($place_order_core){
            if($request->place_order_array != ""){
                foreach($request->place_order_array as $order){
                    $insert_products = DB::table('order_products')->insert([
                        'product_id' => $order['product_id'],
                        'sold_qty' => $order['sold_qty'],
                        'return_qty' => $order['return_qty'],
                        'order_id' => $place_order_core
                    ]);
                }
                echo json_encode('success');
            }else{
                echo json_encode('success');
            }
        }else{
            echo json_encode('failed');
        }
    }

    public function GetOrderDetail(Request $request){
        //echo json_encode($request->id); die;
        //echo json_encode(DB::table('order_products as op')->get());
        echo json_encode(DB::table('order_products as op')->selectRaw('id, product_id, sold_qty, return_qty, (Select name from inventory_core where id = op.product_id) as product_name, (Select price from order_core where id = "'.$request->id.'") as price')->where('order_id', $request->id)->get());
    }

    public function DeleteOrderCoreItem(Request $request){
        $delete_record = DB::table('order_core')
        ->where('id', $request->id)
        ->delete();
        if($delete_record){
            $delete_products = DB::table('order_products')
            ->where('order_id', $request->id)
            ->delete();
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }

    public function DeleteOrderProItem(Request $request){
        $delete_record = DB::table('order_products')
        ->where('id', $request->id)
        ->delete();
        if($delete_record){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }
}
