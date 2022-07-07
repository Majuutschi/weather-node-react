const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const PORT = 9999;

const URL = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json';

app.use(cors());

app.get('/getWeather/', async (req, res) => {

  let result;

  try {
    result = await axios.get(URL);
    res.json(result.data);
  } catch (err) {
    console.error(`failed all api due to ${err.message}`);
  }
});


app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
})
