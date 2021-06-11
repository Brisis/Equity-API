var chart = new Vue({
  el: '#chart',
  data: {
    currencies: [],
    currency: '',
    pair_vs: '',
    isPaired: false,
    user: null,
    loggedOut: true,
    loggedIn: false,
    compared_currency: '',
    compare_currency: '',
  },

  mounted(){
    this.loadUser();
    this.loadCurrency();
    this.loadCurrencies();
  },

  methods: {

    loadUser: function () {
      
      const token = localStorage.access_token;

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
         key: "value"
      };


      axios.post('/api/me',
        bodyParameters,
        config
        )
      .then((response) => {
         this.user = response.data;
         //console.log(this.user);
         this.loggedOut = false;
         this.loggedIn = true;
      }, (error) => {
        console.log(error);
      });
    },

    loadCurrencies: async function () {
      try{
        const response = await axios.get('/api/currencies');

        this.currencies = response.data;
      }
      catch(err){
        console.log(err);
      }
    },

    loadCurrency: function () {
      const currency_id = document.getElementById('cur_id').innerHTML;

      axios.get(`/api/getcurrency/${currency_id}`)
      .then((response) => {
         this.currency = response.data;
      }, (error) => {
        console.log(error);
      });

    },

    getCompare: function (e) {
        const bodyFormData = new FormData();
        bodyFormData.append('compare_currency', this.compare_currency);
        const compared = this.compare_currency;

        axios.post(`/api/compare/${compared}`,bodyFormData, {
         headers: {
             'Content-Type': 'multipart/form-data'
         }})
        .then((response) => {
          this.compared_currency = response.data;

           const bases = this.currency.data;
          const quotes = this.compared_currency.data;

          const base_name = this.currency.name;
          const quote_name = this.compared_currency.name;

          var base_prices = [];
          var quote_prices = [];

          bases.forEach((base) => {
            base_prices.push(parseFloat(base));
          });

          quotes.forEach((quote) => {
            quote_prices.push(parseFloat(quote));
          });


          Highcharts.chart('container', {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Currencies Comparison'
          },
          subtitle: {
            text: 'Source: Equity Axis API'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Price'
            },
            labels: {
              formatter: function () {
                return  '$' + this.value;
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            name: base_name,
            marker: {
              symbol: 'square'
            },
            data: base_prices

          }, {
            name: quote_name,
            marker: {
              symbol: 'diamond'
            },
            data: quote_prices
          }]
        });

        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

  }
});


