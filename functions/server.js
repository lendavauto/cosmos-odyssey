const express = require('express');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const cors = require('cors');

const router = express.Router();

module.exports.handler = serverless(app);

app.use('/.netlify/functions/server', router);

app.use(
  cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Accept'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get(':endpoint([\\/\\w\\.-]*)', (req, res) => {
  let endpoint =
    'https://cosmos-odyssey.azurewebsites.net/api/v1.0' + req.params.endpoint;

  axios
    .get(endpoint)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
  console.log(endpoint);
});

app.listen(3000);
