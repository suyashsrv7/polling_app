<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    public function register(Request $request){
        
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->save();
        return view('dashboard');

    }

    public function duplicate(Request $request){
    
        $field = $request->field;
        $value = $request->value;
        $user = User::where("$field","$value")->first();
        if($user == ""){
            $res = 0;
        }
        else{
            $res = 1;
        }
        return response()->json(['status'=>"$res"]);
        // return $request->field;
    }

    
}
