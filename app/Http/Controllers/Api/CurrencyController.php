<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Currency::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'country' => 'required|string',

            'iso_code' => 'required|string',
        ]);

        $currency = Currency::create(
            [
            'country' => $request['country'],

            'iso_code' => $request['iso_code'],

            'values' => [],

            'user_id' => $request['user_id'],
            ]
        );

        return response()->json($currency); //json
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       return Currency::find($id);
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
        $currency = Currency::findOrFail($id);

        $date = Carbon::today();

        $currency->update(
            [
            'country' => $request['country'],

            'iso_code' => $request['iso_code'],

            'date' => $date->toDateTimeString(),

            'value' => $request['value'],
            ]
        );

        return response()->json($currency);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Currency::destroy($id);
    }

    public function getpairs($name)
    {
        $currency = Currency::where('iso_code', $name)->get();

        $currencies = Currency::all();

        $value = $currency[0]->value;

        $paired = [];

        foreach ($currencies as $curr) {
            $number = ($curr->value) / $value;
            $curr->pair_value = round($number, 4);
            $paired[] = $curr;
        }

        return response()->json($paired);
    }
}
