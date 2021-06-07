<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
     public function index(Request $request)
    {
        //dd($request->user());
        return view('home');
    }

    public function upload()
    {
        return view('upload');
    }

    public function addprice($id)
    {
        $currency = Currency::find($id);

        return view('addprice', ['currency' => $currency]);
    }

    public function chart()
    {
        return view('chart');
    }

    public function admin()
    {
    	return view('admin');
    }
}
