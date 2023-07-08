const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	const q = req.body.city;
	const unit = "metric";
	const appid = "722442bac66f36d813f70b8eed5cc9f8";
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&units="+unit+"&appid="+appid+"";
	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on("data", (data) => {
			const weatherData = JSON.parse(data);

			// console.log(weatherData);
			
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.write("<h1>The temparature in "+ q + " is " + temp + " degrees Celcius!</h1>");
			res.write("<h2>The weather is currently " + desc + " !</h2>");
			res.write("<img src=" + iconURL + ">");
			res.send();
		});
	});

});







app.listen(3000, () => {
	console.log("Server is running on port 3000.");
})