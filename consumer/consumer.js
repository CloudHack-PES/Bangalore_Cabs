const PORT = 7500; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");

app.use(express.json());

var channel, connection;

connect();
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("ride");
        channel.consume("ride", data => {
            console.log(`Received data at ${PORT}: ${Buffer.from(data.content)}`);
            channel.ack(data);
        });
    } catch (error) {
        console.error(error);
    }
}

app.listen(PORT, () => {
    console.log(`Consumer at ${PORT}`);
});