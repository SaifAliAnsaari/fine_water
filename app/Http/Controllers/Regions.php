<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class Regions extends Controller
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

     //City
    public function cities(){
        return view('region/cities');
    }

    public function add_city(Request $request){
        if(DB::table('city_info')->select('id')->where('city_name', $request->city)->first()){
            echo json_encode('already exist');
        }else{
            $insert_city = DB::table('city_info')->insert([
                ['city_name' => $request->city]
                ]);

            if($insert_city){
                echo json_encode("success");
            }else{
                echo json_encode("failed");
            }
        }
    }

    public function cities_list(){
        echo json_encode( DB::table('city_info')
            ->select('id', 'city_name')
            ->get());
    }

    public function GetCityData(Request $request){
        $get_city_data = DB::table("city_info")
        ->where('id', $request->id)
        ->first();
        if($get_city_data){
            echo json_encode($get_city_data);
        }
    } 

    public function get_city_data($id){
        echo json_encode(array('info' => DB::table('city_info')->where("id", $id)->first()));
    }

    public function update_city(Request $request){
        //echo json_encode($request->city_id. " - " . $request->city);
        try{
            $update_city = DB::table('city_info')
        ->where('id', $request->city_id)
        ->update([
            'city_name' => $request->city]);
            
            echo json_encode("success"); 

        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    }

    public function delete_city_entry(Request $request){
        $delete_one_entry = DB::table('city_info')
            ->where('id', $request->id)
            ->delete();
        if($delete_one_entry){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }




    //Area
    public function area(){
        $get_cities = DB::table('city_info')
            ->get();
           // echo "<pre>";print_r($get_cities); die;
        return view('region/area', ['cities' => $get_cities]);
    }

    public function add_area(Request $request){
        //echo json_encode($request->city_name);
        if(DB::table('area_info')->select('id')->whereRaw('area_name = "'.$request->area.'" AND city_id = "'.$request->city_name.'"')->first()){
            echo json_encode('already exist');
        }else{
            $insert_area = DB::table('area_info')->insert([
                ['area_name' => $request->area,
                'city_id' => $request->city_name]
                ]);

            if($insert_area){
                echo json_encode("success");
            }else{
                echo json_encode("failed");
            }
        }
    }

    public function areas_list(){
        echo json_encode( DB::table('area_info as ai')
            ->selectRaw('id, area_name, (Select city_name from city_info where id = ai.city_id) as city_name')
            ->get());
    }

    public function get_area_data($id){
        echo json_encode(array('info' => DB::table('area_info')->where("id", $id)->first()));
    }

    public function update_area(Request $request){
        //echo json_encode($request->city_id. " - " . $request->city);
        try{
            $update_area = DB::table('area_info')
        ->where('id', $request->area_id)
        ->update([
            'area_name' => $request->area,
            'city_id' => $request->city_name]);
            
            echo json_encode("success"); 

        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    }

    public function delete_area_entry(Request $request){
        $delete_one_entry = DB::table('area_info')
            ->where('id', $request->id)
            ->delete();
        if($delete_one_entry){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }



    //Zone
    public function zone(){
        $get_areas = DB::table('area_info')
            ->get();
        return view('region/zone', ['areas' => $get_areas]);
    }

    public function add_zone(Request $request){
        //echo json_encode($request->city_name);
        if(DB::table('zone_info')->select('id')->whereRaw('zone_name = "'.$request->zone.'" AND area_id = "'.$request->area_name.'"')->first()){
            echo json_encode('already exist');
        }else{
            $insert_area = DB::table('zone_info')->insertGetId(
                ['zone_name' => $request->zone,
                'area_id' => $request->area_name]
                );

            if($insert_area){
                DB::table('synced_data_info')->insert([
                'zone_id' => $insert_area,
                'operation' => "add",
                'is_synced' => '0'
                ]);
                echo json_encode("success");
            }else{
                echo json_encode("failed");
            }
        }
    }

    public function zone_list(){
        echo json_encode( DB::table('zone_info as zi')
        ->selectRaw('id, zone_name, (Select area_name from area_info where id = zi.area_id) as area_name')
        ->get());
    }

    public function get_zone_data($id){
        echo json_encode(array('info' => DB::table('zone_info')->where("id", $id)->first()));
    }

    public function update_zone(Request $request){
        //echo json_encode($request->city_id. " - " . $request->city);
        try{
            $update_zone = DB::table('zone_info')
            ->where('id', $request->zone_id)
            ->update([
            'zone_name' => $request->zone,
            'area_id' => $request->area_name]);

            DB::table('synced_data_info')->where('zone_id', $request->zone_id)->update([
                'operation' => "update"
                ]);
            
            echo json_encode("success"); 

        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    }

    public function delete_zone_entry(Request $request){
        $delete_one_entry = DB::table('zone_info')
            ->where('id', $request->id)
            ->delete();
        if($delete_one_entry){
            echo json_encode('success');
        }else{
            echo json_encode('failed');
        }
    }


}
