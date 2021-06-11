@extends('layouts.app')

@section('content')
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>

<style type="text/css">
    .highcharts-figure, .highcharts-data-table table {
  min-width: 310px; 
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
    font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>

<div class="container" id="chart">
    <div class="row justify-content-center">
        <div class="col-md-10 mb-5">
            <div class="card">
                <h4 class="card-header">Compare @{{currency.name}} to @{{compared_currency.name}}</h4>
                <div class="card-body">
                    <form @submit='getCompare'>
                        <div class="row">
                            <div v-for='curr in currencies' class="col-md-4">
                                <label>@{{curr.iso_code}}</label>
                                <input id="curr.id" type="radio" name="compare_currency" v-bind:value="curr.iso_code" v-model='compare_currency'>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                
            </div>
        </div>

        <div class="col-md-10">
            <div class="card">
                <h4 class="card-header">Currency Chart</h4>
                <div class="card-body">
                    <figure class="highcharts-figure">
                      <div id="container"></div>
                      <p class="highcharts-description">
                        No Description
                      </p>
                    </figure>
                </div>
            </div>
        </div>
    </div>
    <div id="cur_id" hidden>{{$currency_php->id}}</div>
</div>
<script src="{{ URL::to('js/chart.js') }}"></script>
@endsection
