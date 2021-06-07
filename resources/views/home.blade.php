@extends('layouts.app')

@section('content')
<div class="container" id="myapp">
    <div class="row justify-content-center">
        <div class="col-md-10">

            <div class="card mt-5">
              <div class="card-header d-flex justify-content-between">
                <h4>Pair Listed Currencies</h4>
                <div>
                  <a href="/admin" class="btn btn-primary">Admin</a>
                  <a href="/upload" class="btn btn-primary">Upload</a>
                  <a href="/chart" class="btn btn-primary">Chart</a>
                </div>
              </div>
              <div class="card-body">
                <form class="form-group" action="" @submit="getPairs">
                  <label>Select Currency</label>
                  <div class="d-flex justify-content-between">
                    <select class="form-control" v-model="pair_currency" name="pair_currency" style="width: 50%;">
                      <option disabled value="">Please select one</option>
                      <option v-for="curr in currencies">@{{curr.iso_code}}</option>     
                    </select>
                    <button type="submit" class="btn btn-primary">Get Pairs</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="card mt-5">
                <div class="card-header d-flex justify-content-between">
                    <h4>Listed Currencies</h4>
                    <h4>Paired Vs @{{pair_vs}}</h4>
                </div>
                <table class="card-body table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Country</th>
                          <th scope="col">Symbol</th>
                          <th scope="col">Date</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                       

                        <tr v-for="currency in currencies">
                          <th scope="row">@{{ currency.id }}</th>
                          <td>@{{ currency.country }}</td>
                          <td>@{{ currency.iso_code }}</td>
                          <td>@{{ currency.date }}</td>
                          <td>
                            <span v-if="isPaired">$1 / $@{{ currency.paired }}</span>
                            <span v-else>$1 / $@{{ currency.price }}</span>
                          </td>
                        </tr>
                        
                      </tbody>
                    </table>
            </div>
        </div>
    </div>
</div>
@endsection
