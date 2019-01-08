<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/home');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/GetCustomersList', 'Customer@CustomersList');
Route::Resource('/Customer', 'Customer');
Route::get('/EmployeesList', 'Auth\RegisterController@EmployeesList');
Route::post('/UploadUserImage', 'Auth\RegisterController@UploadUserImage');
Route::get('/Employee/{id}', 'Employee@GetEmployeeInfo');
Route::post('/UpdateEmployee/{id}', 'Employee@UpdateEmployee');
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::get('/manage_cities', 'Regions@cities');
Route::get('/manage_area', 'Regions@area');
Route::get('/manage_zone', 'Regions@zone');
Route::get('/manage_team', 'Delivery@team');
Route::get('/GetCitiesList', 'Regions@cities_list');
Route::get('/GetAreasList', 'Regions@areas_list');
Route::get('/GetZonesList', 'Regions@zone_list');
Route::get('/GetTeamsList', 'Delivery@delivery_team_list');

Route::get('/get_all_user', 'Delivery@Get_all_users');

Route::get('/GetCityData', 'Regions@GetCityData');

Route::post('/City_save', 'Regions@add_city');
Route::post('/Area_save', 'Regions@add_area');
Route::post('/Zone_save', 'Regions@add_zone');
Route::post('/DeliveryTeam_save', 'Delivery@add_team');

//update
Route::post('/team_update', 'Delivery@update_team');
Route::post('/city_update', 'Regions@update_city');
Route::post('/area_update', 'Regions@update_area');
Route::post('/zone_update', 'Regions@update_zone');


//Get data to show on update form
Route::get('/team_data/{id}', 'Delivery@get_team_data');
Route::get('/city_data/{id}', 'Regions@get_city_data');
Route::get('/area_data/{id}', 'Regions@get_area_data');
Route::get('/zone_data/{id}', 'Regions@get_zone_data');

//Delete
Route::get('/DeleteTeam', 'Delivery@delete_team_entry');
Route::get('/DeleteCity', 'Regions@delete_city_entry');
Route::get('/DeleteArea', 'Regions@delete_area_entry');
Route::get('/DeleteZone', 'Regions@delete_zone_entry');

//Deactive or Active Employee
Route::get('/activate_employee', 'Employee@activate_employee');
Route::get('/deactivate_employee', 'Employee@deactivate_employee');
