var auth = new Vue({
  el: '#auth',
  data: {
    name: null,
    email: null,
    password: null,
    user: null,
    loggedOut: true,
    loggedIn: false,
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

  }
});


