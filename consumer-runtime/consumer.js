const PORT = process.env.PORT || 7500; // temp port
const express = require("express");
const app = express();
const { printTable } = require('console-table-printer');
const amqp = require("amqplib");
const name = process.env.NAME || "Nitish";
const Producer = process.env.PRODUCER || "localhost"; // temp port

const axios = require("axios");


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
      async (data) => {
        channel.ack(data);
        res =  JSON.parse(Buffer.from(data.content).toString());
        await axios
          .post("http://"+Producer+":6969/new_ride_matching_consumer", {
            client_ip: res.client_ip,
            client_name: res.name,
            consumer_port:PORT,
            consumer_name: name,

          })
          .then(function (response) {
            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log("sent status");

        // console.log(`Received data at ${PORT}: ${JSON.stringify(res)}`);
        printTable([res]);
        console.log("\n");
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
