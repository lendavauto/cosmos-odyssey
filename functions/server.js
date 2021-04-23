const express = require('express');
const app = express();
const serverless = require('serverless-http');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const router = express.Router();

module.exports.handler = serverless(app);

app.use('/.netlify/functions/server.js', router);

app.use(
  cors({
    origin: '*',
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
});

app.listen(3000);
