<?php

namespace App\Http\Controllers;

use App\Customer as Cust;
use Illuminate\Http\Request;
use DB;
use URL;
use Illuminate\Support\Facades\Storage;

class Customer extends Controller
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
    public function index()
    {
        return view('customer.customer', [ 'customers' => Cust::selectRaw('id, company_name')->get(), 'types' => DB::table('customer_types')->get(), 'zone' => DB::table('zone_info')->get() ]);
    }

    //Ajax Call from list-customers.js
    public function CustomersList(){
        // GetCustomersList
        echo json_encode( DB::table('customers as cust')->select('id', 'company_name', 'company_poc', 'customer_type', 'country', DB::raw('IFNULL(region, "NA") as region'), DB::raw('IFNULL((SELECT company_name from customers where id = cust.parent_company), "NA") as parent_company'))->get());
    }

    public function viewProfile($customerId){
        return view('customer.profile', [ 'customers' => Cust::select('id', 'company_name')->get(), 'types' => DB::table('customer_types')->get(), 'update_customer' => DB::table('customers')->where('id', $customerId)->first() ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('customer.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'businessPh' => 'required|max:100|numeric',
        //     'compName' => 'required|max:100'
        // ]);
        $customer = new Cust;
        $customer->company_name = $request->compName;
        $customer->company_poc = $request->poc;
        $customer->job_title = $request->jobTitle;
        $customer->business_phone = $request->businessPh;
        $customer->home_phone = $request->homePh;
        $customer->mobile_phone = $request->mobPh;
        $customer->whatsapp_phone = $request->whatsappPh;
        $customer->fax_number = $request->faxPh;
        $customer->address = $request->address;
        $customer->city = $request->city;
        $customer->state = $request->state;
        $customer->country = $request->country;
        $customer->region = $request->region;
        $customer->email = $request->email;
        $customer->webpage = $request->webpage;
        $customer->customer_acquisition_source = $request->acqSource;
        $customer->remarks = $request->description;
        $customer->customer_type = $request->type;
        $customer->zone_id = $request->zone;
        $customer->parent_company = $request->parentCompnay;
        
        if($request->hasFile('compPicture')){
            $completeFileName = $request->file('compPicture')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
            $extension = $request->file('compPicture')->getClientOriginalExtension();
            $compPic = str_replace(' ', '_', $fileNameOnly).'-'. rand() .'_'.time().'.'.$extension;
            $path = $request->file('compPicture')->storeAs('public/company', $compPic);
            $customer->picture = $compPic;
        }

        if($customer->save()){
            $delivPorts = explode(",", $request->delivery_ports);
            foreach($delivPorts as $port){
                DB::table('customer_delivery_ports')->insert(array('customer_id' => $customer->id, 'port_name' => $port));
            }

            $docTypes = explode(",", $request->document_types);
            foreach($docTypes as $type){
                DB::table('customer_documents')->insert(array('customer_id' => $customer->id, 'document_id' => $type));
            }
            echo json_encode('success');
            
        }

        // DB::table('customer_delivery_ports')->insert(array('customer_id' => $customer->id, 'port_name' => ));

        // $customer->type = $request->documentTypes;
        // $customer->type = $request->deliveryPorts;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        echo json_encode(array('info' => DB::table('customers as cust')->selectRaw('`id`, `company_name`, `company_poc`, `job_title`, `business_phone`, `home_phone`, `mobile_phone`, `whatsapp_phone`, `fax_number`, `address`, `city`, `state`, `country`, `region`, `email`, `webpage`, `remarks`, `customer_type`, `customer_acquisition_source`, `parent_company`, `picture`, `zone_id`')->where('id', $id)->first(), 'delivery_ports' => DB::table('customer_delivery_ports')->select('port_name')->where('customer_id', $id)->get(), 'document_types' => DB::table('customer_documents')->select('document_id')->where('customer_id', $id)->get(), 'base_url' => URL::to('/')));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $customer = Cust::find($id);

        $customer->company_name = $request->compName;
        $customer->company_poc = $request->poc;
        $customer->job_title = $request->jobTitle;
        $customer->business_phone = $request->businessPh;
        $customer->home_phone = $request->homePh;
        $customer->mobile_phone = $request->mobPh;
        $customer->whatsapp_phone = $request->whatsappPh;
        $customer->fax_number = $request->faxPh;
        $customer->address = $request->address;
        $customer->city = $request->city;
        $customer->state = $request->state;
        $customer->country = $request->country;
        $customer->region = $request->region;
        $customer->email = $request->email;
        $customer->webpage = $request->webpage;
        $customer->customer_acquisition_source = $request->acqSource;
        $customer->remarks = $request->description;
        $customer->customer_type = $request->type;
        $customer->zone_id = $request->zone;
        $customer->parent_company = $request->parentCompnay;

        if($request->hasFile('compPicture')){
            $existingImg = $customer->picture;
            if(Storage::exists('public/company/'.$existingImg)){
                Storage::delete('public/company/'.$existingImg);
            }

            $completeFileName = $request->file('compPicture')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
            $extension = $request->file('compPicture')->getClientOriginalExtension();
            $compPic = str_replace(' ', '_', $fileNameOnly).'-'. rand() .'_'.time().'.'.$extension;
            $path = $request->file('compPicture')->storeAs('public/company', $compPic);
            $customer->picture = $compPic;
        }

        $customer->save();
        if($customer->save()){
            DB::table('customer_delivery_ports')->where('customer_id', $id)->delete();
            $delivPorts = explode(",", $request->delivery_ports);
            foreach($delivPorts as $port){
                DB::table('customer_delivery_ports')->insert(array('customer_id' => $id, 'port_name' => $port));
            }

            DB::table('customer_documents')->where('customer_id', $id)->delete();
            $docTypes = explode(",", $request->document_types);
            foreach($docTypes as $type){
                DB::table('customer_documents')->insert(array('customer_id' => $id, 'document_id' => $type));
            }
            echo json_encode('success');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($customerId)
    {
        DB::table('customer_documents')->where('customer_id', $customerId)->delete();
        DB::table('customer_delivery_ports')->where('customer_id', $customerId)->delete();
        
        if(Storage::exists('public/company/'.Cust::find($customerId)->picture)){
            Storage::delete('public/company/'.Cust::find($customerId)->picture);
        }
        $status = Cust::find($customerId)->delete();
        if($status){
            echo json_encode('success');
        }else{
            echo json_encode('Exception: ' + $status);
        }
    }
}
