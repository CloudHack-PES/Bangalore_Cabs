const PORT = process.env.PORT || 6969; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");

var map_arr = [];
var connect;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

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
  // await channel.sendToQueue("db", Buffer.from(JSON.stringify(user)));
};

const writedb = async (data) => {
  await channel.sendToQueue("db", Buffer.from(JSON.stringify(data)));
};

app.post("/new_ride", (req, res) => {
  req.body.client_ip = req.ip;
  req.body.time = "20";
  console.log(req.body.client_ip + " WORK WHY");
  console.log(req.ip + " WORK WHY IP");
  req.body.cost = "300";
  console.log(req.body.client_ip);
  createSession(req.body);
  res.status("200").json(req.body);
});

app.post("/new_ride_matching_consumer", (req, res) => {
  let o = {
    client_ip: req.body.client_ip,
    name: req.body.name,
    cost: req.body.cost,
    pickup: req.body.pickup,
    destination: req.body.destination,
    seats: req.body.seats,
    time: req.body.time,
    consumer_ip: req.ip,
    consumer_id: req.body.consumer_id,
    driver_name: req.body.driver_name,
  };
  map_arr.push(o);
  writedb(o);
  console.log(
    `client ${o.name} ${o.client_ip} is matched to consumer ${o.driver_name} with ip ${o.consumer_ip} `
  );

  res.send(req.body);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
