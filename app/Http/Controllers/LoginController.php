<?php

namespace App\Http\Controllers;
use Session;
use Redirect;
use Auth;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    //
    public function login(Request $request){
        $res = 0;

        if(Auth::attempt([
            'username' => $request->username,
            'password' => $request->password
        ]))
        {
            $res = 1;
        }
        return response()->json(['status' => $res , 'error' => 'Wrong email or password']);
    }

    public function logout(){
        Session::flush ();
        Auth::logout ();
        return redirect('/home');
    }
}
