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
        return view('order_management.order');
    }

    public function GetCustomersAndOrders(){
        $customers = DB::table('customers')->get();
        $inventory = DB::table('inventory_core')->get();
        echo json_encode(['customers' => $customers, 'inventory' => $inventory]);
    }
}
