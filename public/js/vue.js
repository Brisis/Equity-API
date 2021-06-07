var app = new Vue({
  el: '#app',
  data: {
    name: null,
    email: null,
    password: null,
    currencies: [],
    pair_vs: '',
    isPaired: false,
    user: null,
    loggedOut: true,
    loggedIn: false,
    curr_country: null,
    curr_iso_code: null,
    curr_name: null,
    curr_date: null,
    curr_price: null,
    curr_user_id: null,
    pair_currency: ''
  },

  mounted(){
    this.loadCurrencies();
    this.loadUser();
    this.getChart();
  },

  methods: {
    registerUser: function (e) {
        const bodyFormData = new FormData();
        bodyFormData.append('name', this.name);
        bodyFormData.append('email', this.email);
        bodyFormData.append('password', this.password);
        bodyFormData.append('password_confirmation', this.password);

        console.log(this.name);

        axios.post('/api/register',bodyFormData,{
         headers: {
             'Content-Type': 'multipart/form-data'
         }})
        .then((response) => {
           localStorage.access_token = response.data.access_token;
           this.loggedIn = true;
           window.location = '/';
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

    loginUser: function (e) {
        const bodyFormData = new FormData();
        bodyFormData.append('email', this.email);
        bodyFormData.append('password', this.password);

        axios.post('/api/login',bodyFormData,{
         headers: {
             'Content-Type': 'multipart/form-data'
         }})
        .then((response) => {
           localStorage.access_token = response.data.access_token;
           this.loggedIn = true;
           window.location = '/';
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

    logOut: function (e) {
      
      const token = localStorage.access_token;

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
         key: "value"
      };


      axios.post('/api/logout',
        bodyParameters,
        config
        )
      .then((response) => {
         this.user = null;
         this.loggedOut = true;
         this.loggedIn = false;
         localStorage.access_token = null;

         window.location = '/login';
      }, (error) => {
        console.log(error);
      });

      e.preventDefault();
    },

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

    addCurrencies: function (e) {
        const token = localStorage.access_token;

        this.curr_user_id = this.user.id;

        const bodyFormData = new FormData();
        bodyFormData.append('country', this.curr_country);
        bodyFormData.append('iso_code', this.curr_iso_code);

        //Get User Id
        bodyFormData.append('user_id', this.curr_user_id);

        //console.log(bodyFormData);

        axios.post('/api/currencies',bodyFormData, {
         headers: {
             'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`
         }})
        .then((response) => {
          console.log(response.data);

          this.curr_user_id = null;
          this.curr_country = null;
          this.curr_iso_code = null;

          //window.location = '/';
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

    addPrice: function (e) {
        const token = localStorage.access_token;

        this.curr_id = this.user.id;

        const bodyFormData = new FormData();
        bodyFormData.append('price', this.price_value);
        bodyFormData.append('date', this.price_date);

        //Get User Id
        bodyFormData.append('user_id', this.curr_id);

        //console.log(bodyFormData);

        axios.post('/api/prices',bodyFormData, {
         headers: {
             'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`
         }})
        .then((response) => {
          console.log(response.data);

          this.price_value = null;
          this.price_date = null;
          this.curr_id = null;
          
          //window.location = '/';
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

    getPairs: function (e) {
        const bodyFormData = new FormData();
        bodyFormData.append('pair_currency', this.pair_currency);
        const paired = this.pair_currency;

        axios.get(`/api/pair/${paired}`,bodyFormData, {
         headers: {
             'Content-Type': 'multipart/form-data'
         }})
        .then((response) => {
          this.pair_vs = paired;
          this.currencies = response.data;
          this.isPaired = true;
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },


    loadCurrencies: async function () {
      
    },

    getChart: async function () {
        try {
          const response = await axios.get('/api/currencies');
          this.currencies = response.data;

          const curr_arr = this.currencies;
          var currencies = [];
          var curr_values = [];
          curr_arr.forEach((curr) => {
            currencies.push(curr.name);

            curr_values.push(curr.price);
          })

          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: currencies,
                  datasets: [{
                      label: 'Currency Pairs',
                      data: curr_values,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
        } catch (error) {
          console.error(error);
        }
      
    }

  }
});


