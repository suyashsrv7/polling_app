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

Route::get('/home', function () {
    return view('index');
});

Route::post('/register',['uses'=>'RegistrationController@register','as'=>'register']);
Route::post('/check_duplicate_entry','RegistrationController@duplicate');
Route::get('/login',function(){
    return view('login');
});
Route::post('/login',['uses'=>'LoginController@login']);
Route::get('/logout',['uses'=>'LoginController@logout']);
Route::get('/dashboard' ,function(){
    return view('dashboard');
});
