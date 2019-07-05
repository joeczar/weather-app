/*jshint esversion: 6 */
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const darkSky = require("./utils/darkSky");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// Set up Handlebars engine and views
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

// Setup Static Directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Wetter",
    name: "Joe Czarnecki"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Joe Czarnecki"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Hilfe",
    name: "Joe Czarnecki",
    helpMessage: "Only you can help yourself."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please enter an address."
    });
  }
  geoCode(req.query.location, (error, { lattitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    darkSky(lattitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: weatherData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Joe Czarnecki"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Joe Czarnecki"
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
