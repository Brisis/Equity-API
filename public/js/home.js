var home = new Vue({
  el: '#home',
  data: {
    currencies: [],
    pair_vs: '',
    isPaired: false,
    user: null,
    loggedOut: true,
    loggedIn: false,
    pair_currency: ''
  },

  mounted(){
    this.loadCurrencies();
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


    loadCurrencies: async function () {
      try{
        const response = await axios.get('/api/currencies');

        this.currencies = response.data;
      }
      catch(err){
        console.log(err);
      }
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

  }
});


