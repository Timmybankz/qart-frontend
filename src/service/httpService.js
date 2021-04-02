const axios = require('axios');
const { toast } = require('react-toastify');

const url = 'http://localhost:2000/validate-payment/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {

  config.headers['Content-Type'] = 'application/json';
  return config;
});

exports.postCustomerRequest = async (data) => {
    return await axios.post(url, data);
}

exports.successToast = (msg) => {
    toast.success(msg);
}

exports.errorToast = (msg) => {
    toast.error(msg);
}

