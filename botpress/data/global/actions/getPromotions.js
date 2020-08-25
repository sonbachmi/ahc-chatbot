const axios = require('axios');

// Fetch promotions
axios.get('/promotions')
    .then(function (response) {
        // handle success
        console.log(response);
        event.state.temp.promotions = response.promotions;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
