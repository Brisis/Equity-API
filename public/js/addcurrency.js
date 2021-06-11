var addcurrency = new Vue({
  el: '#addcurrency',
  data: {
    user: null,
    loggedOut: true,
    loggedIn: false,
    curr_country: null,
    curr_iso_code: null,
    curr_name: null,
    curr_date: null,
    curr_price: null,
    curr_user_id: null,
  },

  mounted(){
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

  }
});


