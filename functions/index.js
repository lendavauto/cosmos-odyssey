const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')(functions.config().stripe.secret);
const express = require('express');
const cors = require('cors')({ origin: true });


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

const app = express();

app.use(cors);

app.use(express.json());

app.post('/checkout/create', async (req, res) => {
  const total = req.query.total;

  console.log('Payment Request received!', 'Heres the total:', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.createPaymentIntent = functions.https.onRequest(app);
