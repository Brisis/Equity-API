var addprice = new Vue({
  el: '#addprice',
  data: {
    currencies: [],
    user: null,
    loggedOut: true,
    loggedIn: false,
    currency: {},
    price_value: '',
    price_date: '',
    curr_id: '',
  },

  mounted(){
    this.loadCurrency();
    this.loadUser();
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

    loadCurrency: function () {
      const token = localStorage.access_token;
      const currency_id = document.getElementById('cur_id').innerHTML;

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
         key: "value"
      };

      axios.post(`/api/addprice/${currency_id}`,
        bodyParameters,
        config
        )
      .then((response) => {
         this.currency = response.data;
         this.curr_id = this.currency.id;
      }, (error) => {
        console.log(error);
      });

    },

    addPrice: function (e) {
        const token = localStorage.access_token;

        this.curr_id = this.currency.id;

        const bodyFormData = new FormData();
        bodyFormData.append('price', this.price_value);
        bodyFormData.append('date', this.price_date);

        //Get User Id
        bodyFormData.append('currency_id', this.curr_id);

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
          
          //window.location = '/';
        }, (error) => {
          console.log(error);
        });

        e.preventDefault();
    },

  }
});



