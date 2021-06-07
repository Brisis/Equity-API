@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <h4 class="card-header">Upload Currency</h4>
                <div class="card-body">
                    <form @submit="addCurrencies">
                        @csrf
                        <div class="form-group">
                            <label>Country</label>
                            <input class="form-control" type="text" name="country" v-model="curr_country" required>
                        </div>
                        <div class="form-group">
                            <label>ISO Code</label>
                            <input class="form-control" type="text" name="iso_code" v-model="curr_iso_code" required>   
                        </div>
                        <div class="form-group" hidden>
                            <input type="number" class="form-control" name="user_id" v-model="curr_user_id">
                        </div>
                        <input type="submit" value="Upload">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
