var admin = new Vue({
  el: '#admin',
  data: {
    currencies: [],
    user: null,
    loggedOut: true,
    loggedIn: false,
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

  
    getAdminCurrency: function () {
      
      const token = localStorage.access_token;

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
         key: "value"
      };

      axios.post('/api/addprice/{id}',
        bodyParameters,
        config
        )
      .then((response) => {
         this.user = response.data;
         //console.log(this.user);
         this.admincu
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

  }
});
