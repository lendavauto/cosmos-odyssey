require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');

app.use(
  cors({
    origin: '*',
  })
);

app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {
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
