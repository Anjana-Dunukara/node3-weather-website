const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anjana Dunukara",
  });
});

app.get("/about-me", (req, res) => {
  res.render("about-me", {
    title: "About Me",
    name: "Anjana Dunukara",
  });
});

app.get("/about-weathercast", (req, res) => {
  res.render("about-weathercast", {
    title: "Help",
    message: "This is Help Page",
    name: "Anjana Dunukara",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longtitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/about-weathercast/*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Page Not Found",
    name: "Anjana Dunukara",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Page Not Found",
    name: "Anjana Dunukara",
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
