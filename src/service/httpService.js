const axios = require('axios');
const { toast } = require('react-toastify');

const url = 'https://apple-sundae-08986.herokuapp.com/validate-payment/';
// const url = 'http://localhost:2000/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {

  config.headers['Content-Type'] = 'application/json';
  return config;
});

async function postCustomerRequest(data) {
    return await axios.post(url, data);
}

function successToast(msg) {
    toast.success(msg);
}

function errorToast(msg) {
    toast.error(msg);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    errorToast,
    postCustomerRequest,
    successToast
}
  
