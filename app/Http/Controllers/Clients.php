<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class Clients extends Controller
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
    public function clients(){
        return view("clients/clients");
    }

    //get clients
    public function ClientsList(){

        //echo json_encode("abc");
        echo json_encode( DB::table('clients as client')
            ->select('id', 'username', 'poc', 'email', 'client_name', 
                DB::raw('IFNULL(image, "") as image'))
            ->get());

    }

    //add client
    public function save_client(Request $request){
        //echo json_encode($request->client_name);
        
        if(DB::table('clients')->select('id')->where("email", $request->email)->first()){
            echo json_encode('already exist');
        }else{
            $insert_client_data = DB::table('clients')->insert([
                ['username' => $request->username, 
                'password' => $request->password, 
                'client_name' => $request->client_name,
                'poc' => $request->poc, 
                'phone' => $request->phone,
                'email' => $request->email,
                'website' => $request->website,
                'city' => $request->city,
                'address' => $request->address]
                ]);

            if($insert_client_data){
                echo json_encode("success");
            }else{
                echo json_encode("failed");
            }
        }
    }

    public function GetClientData(Request $request){
        $get_client_data = DB::table("clients")
            ->where('id', $request->id)
            ->first();
        if($get_client_data){
            echo json_encode($get_client_data);
        }
    }
}
