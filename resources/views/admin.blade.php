@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <h4 class="card-header">Admin {{ __('Dashboard') }}</h4>
            </div>

            <div class="card mt-5">
                <div class="card-header d-flex justify-content-between">
                    <h4>Listed Currencies</h4>
                    <a class="btn btn-primary" href="/upload">Add Currency</a>
                </div>
                <table class="card-body table">
                      <thead>
                        <tr>
                          <th scope="col">#ID</th>
                          <th scope="col">Country</th>
                          <th scope="col">ISO Code</th>
                          <th scope="col">Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="currency in currencies">
                          <th scope="row">@{{ currency.id }}</th>
                          <td>@{{ currency.country }}</td>
                          <td>@{{ currency.iso_code }}</td>
                          <td>
                            <a class="badge badge-primary"  v-bind:href="'/add-price/'+ currency.id">Add New Price</a>
                            <a class="badge badge-danger" href="/delete">Delete</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
            </div>
        </div>
    </div>
</div>
@endsection
