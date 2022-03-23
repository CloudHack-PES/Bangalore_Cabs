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
        channel.prefetch(1);

        channel.consume("ride",  data => {
            
            // // channel.ack(data);

            // // var waitTill = new Date(new Date().getTime() + 3 * 1000);
            
            //  setTimeout(function() {
                
                channel.ack(data);
                console.log(`Received data at ${PORT}: ${Buffer.from(data.content)}`);

                var waitTill = new Date(new Date().getTime() + 2 * 1000);
                while(waitTill > new Date()){}

            //   }, 1 * 1000);
              }, {
                noAck: false        
        });
    } catch (error) {
        console.error(error);
    }
}

app.listen(PORT, () => {
    console.log(`Consumer at ${PORT}`);
});