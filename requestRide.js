const axios = require("axios");

axios
  .post("http://localhost:6969/new_ride/", {
    cost: 100,
    pickup: "pes college",
    destination: "hell",
    seats: 5,
    time: "now",
    name: "nitish",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
