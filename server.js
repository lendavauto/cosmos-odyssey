const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const axios = require('axios');


app.use(cors());

app.get(':endpoint([\\/\\w\\.-]*)', (req, res) => {
  let endpoint = process.env.API_BASE_URL + req.params.endpoint;

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
