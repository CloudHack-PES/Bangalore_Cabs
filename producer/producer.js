const PORT = process.env.PORT || 6969; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");

app.use(express.json());

connect();
async function connect() {
  try {
    const amqpServer = process.env.AMQP_URL;
    // const amqpServer = "amqp://rabbitmq:5672";
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
  createSession(req.body);
  req.body.time="20";
  req.body.cost="300";
  res.send(req.body);
});
app.post("/new_ride_matching_consumer", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
