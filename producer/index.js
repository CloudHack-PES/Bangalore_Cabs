const PORT = 6969; // temp port
const express = require("express");
const app = express();

app.use(express.json());

app.post("/new_ride", (req, res) => {
  console.log(req.body);
  res.send(request.body);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
