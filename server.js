if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const API_KEY = process.env.API_KEY;
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("./"));

app.post("/weather", (req, res) => {
  console.log(req.body);

  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city},${req.body.countryCode}&units=metric&lang=es&appid=${API_KEY}`;

  axios({
    url: apiURL,
    responseType: "json",
  }).then(({ data }) => {
    console.log("Hello from server");
    return res.json(data);
  });
});

app.listen(4000, () => {
  console.log("Server Started");
});
