const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  // User dummy data
  const userData = {
    username: "Shashank S Shetty",
    country: "India",
    contact_number: 987654321
  };

  // JSON resource
  res.json(userData);
});

module.exports = route;
