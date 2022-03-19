const PORT = 6969; // temp port
const express = require("express");
const app = express();

app.use(express.json());

app.post("/new_ride", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.post("/new_ride_matching_consumer", (req, res) => {
  console.log(req.body);
  res.send(req.body);
}); 


app.listen(PORT, () => console.log(`server started on port ${PORT}`));
