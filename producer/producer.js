const PORT = process.env.PORT || 6969; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");

var map_arr = [];

app.use(express.json());

connect();
async function connect() {
  try {
    const amqpServer = process.env.AMQP_URL;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ride");
    await channel.assertQueue("db");
  } catch (error) {
    console.error(error);
  }
}

const createSession = async (user) => {
  await channel.sendToQueue("ride", Buffer.from(JSON.stringify(user)));
  await channel.sendToQueue("db", Buffer.from(JSON.stringify(user)));
};

app.post("/new_ride", (req, res) => {
  req.body.client_ip = req.ip;
  createSession(req.body);
  res.send(req.body);
});
app.post("/new_ride_matching_consumer", (req, res) => {
  let o = {
    client_ip: req.body.client_ip,
    consumer_ip: req.ip,
    name: req.body.name,
  };
  map_arr.push(o);
  console.log(
    `client ${o.client_ip} is matched to consumer ${o.name} with ip ${o.consumer_ip} `
  );
  res.send(req.body);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
