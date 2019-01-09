<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class Delivery extends Controller
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
    public function team(){
        $areas = DB::table('area_info')->get();

        //SELECT id, username FROM users WHERE id NOT IN (Select user_id from delivery_team_members)
        $users = DB::table('users')->select('id', 'username')->whereRaw('id NOT IN (Select user_id from delivery_team_members)')->get();
        //print_r($users); die;
        return view('delivery.manage_team', ['areas' => $areas, 'users' => $users]);
    }

    public function add_team(Request $request){
       $insert_team = DB::table('delivery_team')->insertGetId([
            'team_name' => $request->team_name,
            'vehical_make_model' => $request->vehical_make_model,
            'vehical_type' => $request->vehical_type,
            'vehical_license' => $request->vehical_license_num,
            'capacity_filled' => $request->vehical_capicity_filled,
            'capacity_empty' => $request->vehical_capicity_empty,
            'area_id' => $request->area_name
            ]);

            if($insert_team){
                $members =  explode(',', $request->team_members);

                foreach ($members as $member) {
                    $insert_member = DB::table('delivery_team_members')->insert([
                        'user_id' => $member,
                        'delivery_team_id' => $insert_team
                        ]);
                }
                echo json_encode("success"); 
                
            }else{
                echo json_encode("failed");
            }
    }

    public function update_team(Request $request){
        try{
            $update_team = DB::table('delivery_team')
        ->where('id', $request->team_id)
        ->update([
            'team_name' => $request->team_name,
            'vehical_make_model' => $request->vehical_make_model,
            'vehical_type' => $request->vehical_type,
            'vehical_license' => $request->vehical_license_num,
            'capacity_filled' => $request->vehical_capicity_filled,
            'capacity_empty' => $request->vehical_capicity_empty,
            'area_id' => $request->area_name
            ]);

            $delete_existing_members = DB::table('delivery_team_members')
                    ->where('delivery_team_id', $request->team_id)
                    ->delete();

            $members =  explode(',', $request->team_members);
            foreach ($members as $member) {
                $insert_member = DB::table('delivery_team_members')->insert([
                    'user_id' => $member,
                    'delivery_team_id' => $request->team_id
                    ]);
            }
            
            echo json_encode("success"); 
        } catch(\Illuminate\Database\QueryException $ex){ 
            echo json_encode('failed'); 
        }
    }

    public function delivery_team_list(){
        echo json_encode( DB::table('delivery_team as dt')
        ->select('id', 'team_name', 'vehical_type', 'vehical_license', 'capacity_filled', 'capacity_empty')
        ->get());
    }

    public function Get_all_users(Request $request){
        $users = DB::table('users')->select('id', 'username')->whereRaw('id NOT IN (Select user_id from delivery_team_members)')->get();
        echo json_encode($users);
    }


    public function get_team_data($id){
        //Jo users free hain
        $users = DB::table('users')->select('id', 'username')->whereRaw('id NOT IN (Select user_id from delivery_team_members)')->get();

        $get_team = DB::table('delivery_team')
            ->where('id', $id)
            ->first();
        // $get_members = DB::table('delivery_team_members')
        //     ->where('delivery_team_id', $id)
        //     ->get();

        $get_members = DB::table('delivery_team_members as dt')
            ->selectRaw('id, user_id, delivery_team_id, (Select username from users where id = dt.user_id) as name')
            ->where('delivery_team_id', $id)
            ->get();


        echo json_encode(array('info' => $get_team, 'members' => $get_members, 'free_users' =>$users));
    
    }

    public function delete_team_entry(Request $request){
        $delete_one_entry = DB::table('delivery_team')
            ->where('id', $request->id)
            ->delete();
        $delete_entry_members = DB::table('delivery_team_members')
            ->where('delivery_team_id', $request->id)
            ->delete();
        echo json_encode('success');
    }
}
