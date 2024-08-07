const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const { getWeatherData } = require('./WeatherApiService');
const app = express();
const cors = require('cors');

const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
};
  
app.use(cors(corsOpts));

app.get('/', (req, res) => {
  res.send('hello world')
});

app.get('/weather-data', async (req, res) => {

    const {
        cityName
    } = req.query || {};

    if (!cityName) {
        return res.status(400).json({
            message: "City name not passed"
        });
    }

    const result = await getWeatherData({
        cityName
    });

    res.status(200).json(result);
});

app.listen(process.env.PORT, () => {
    console.log(`SERVER STARTED`);
});