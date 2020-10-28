const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});


app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);


    const req = require('request');
    req(`https://api.openweathermap.org/data/2.5/weather?q=${request.body.city}&appid=603c86c72782f16c3434fd399d347657`, { json: true }, (err, res, resp_body) => {
        if (err) { return console.log(err); }
        title = `<h1>Weather in ${request.body.city}:</h1>`;
        temperature = `<h3>Temperature: ${(resp_body.main.temp - 273.15).toFixed(2)} °C</h3>`;
        temperatureFeels = `<h3>Feels like: ${(resp_body.main.feels_like - 273.15).toFixed(2)} °C</h3>`;
        pressure = `<h3>Pressure: ${resp_body.main.pressure} kPa</h3>`;
        humidity = `<h3>Pressure: ${resp_body.main.humidity}%</h3>`;
        windSpeed = `<h3>Wind speed: ${resp_body.wind.speed} km/h</h3>`;
        weatherDescription = `<h3>Description: ${resp_body.weather[0].main}</h3>`;
        response.send(`${title}${temperature}${temperatureFeels}${pressure}${humidity}${windSpeed}${weatherDescription}`);
    });
});

app.listen(port);
console.log(`server is listening on ${port}`)
