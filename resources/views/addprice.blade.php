@extends('layouts.app')

@section('content')
<div class="container" id="addprice">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <h4 class="card-header">Add Price to USD / @{{currency.iso_code}}</h4>
                <div class="card-body">
                    <form @submit="addPrice">
                        @csrf
                        <div class="form-group">
                            <label>Price Value</label>
                            <input class="form-control" type="number" name="price" step=".01" min="0" v-model="price_value" required>
                        </div>
                        <div class="form-group">
                            <label>Date</label>
                            <input class="form-control" type="date" name="date" v-model="price_date" required>   
                        </div>
                        <div class="form-group" hidden>
                            <input type="text" class="form-control" name="currency_id" v-model="curr_id">
                        </div>
                        <input type="submit" value="Upload">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="cur_id" hidden>{{$currency_php->id}}</div>
</div>
<script src="{{ URL::to('js/addprice.js') }}"></script>
@endsection
