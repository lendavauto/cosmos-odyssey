const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.customApi = functions.https.onRequest((req, res) => {
  const cors = require('cors')({ origin: true });
  cors(req, res, () => {
    const axios = require('axios');
    let endpoint =
      'https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices';
    axios
      .get(endpoint)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.json(error);
      });
  });
});
