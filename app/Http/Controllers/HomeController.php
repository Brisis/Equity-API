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

    public function compare($id)
    {
        $currency_php = Currency::find($id);

        return view('chart', ['currency_php' => $currency_php]);
    }

    public function upload()
    {
        return view('upload');
    }

    public function addprice($id)
    {
        $currency_php = Currency::find($id);

        return view('addprice', ['currency_php' => $currency_php]);
    }

    public function admin()
    {
    	return view('admin');
    }
}
