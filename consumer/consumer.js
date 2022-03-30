const PORT = process.env.PORT || 7500; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");
const driver_name = process.env.NAME || "Nitish";
const consumer_id = process.env.CONSUMER_ID || 1;

app.use(express.json());

var channel, connection;

connect();
async function connect() {
  try {
    const amqpServer = process.env.AMQP_URL;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ride");
    channel.prefetch(1);

    channel.consume(
      "ride",
      (data) => {
        channel.ack(data);
        const axios = require("axios");

        res = JSON.parse(Buffer.from(data.content).toString());
        const { cost, pickup, destination, seats, time, name } = res;
        axios
          .post("http://producer:6969/new_ride_matching_consumer", {
            client_ip: res.client_ip,
            consumer_id: consumer_id,
            name: name,
            cost: cost,
            pickup: pickup,
            destination: destination,
            driver_name: driver_name,
            seats: seats,
            time: time,
          })
          .then(function (response) {
            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log("ride matching request is sent");
        var waitTill = new Date(new Date().getTime() + Number(res.time) * 1000);
        while (waitTill > new Date()) {}
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

app.listen(PORT, () => {
  console.log(`Consumer at ${PORT}`);
});
