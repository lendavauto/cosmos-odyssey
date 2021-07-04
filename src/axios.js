import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-cosmos-odyssey.cloudfunctions.net/createPaymentIntent'
    // 'https://localhost:5001/cosmos-odyssey/us-central1/createPaymentIntent'
});

export default instance;

