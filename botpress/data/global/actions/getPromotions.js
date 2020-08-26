// const axios = require('axios');
//
// // Fetch promotions
// axios.get('/promotions')
//     .then(function (response) {
//         // handle success
//         console.log(response);
//         event.state.temp.promotions = response.promotions;
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });

const LazadaAPI = require('lazada-open-platform-sdk');

const getPromotions = async () => {

// const lazada = new LazadaAPI('122307', 'M4Y4bm1WYwgGW714XoisrtzVMsDIbPEu', 'VIETNAM');
    const lazada = new LazadaAPI('122309', 'sjcJVjql9uGKQys0XgE7AEgynMITsP9M', 'VIETNAM');

    let response = await lazada.getBrands({
        offset: '0',
        limit: '10',
    });
    const brands = response.data;
    response = await lazada.getCategoryTree({
    });
    const categories = response.data;
    temp = event.state.temp = {brands, categories};
};

return getPromotions();
