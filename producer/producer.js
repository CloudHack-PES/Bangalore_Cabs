const PORT = process.env.PORT || 6969; // temp port
const express = require("express");
const app = express();
const amqp = require("amqplib");

var map_arr = [];
let task_id = 0;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

app.post("/new_ride", (req, res,next) => {
  task_id++;
  req.body.client_ip = String(req.body.client_ip).substr(7);
  req.body.time = Math.floor(Math.random()*(20-7)+7);
  req.body.cost = Math.floor(Math.random()*(1000-100)+100);
  req.body.task_id=task_id;
  // console.log(req.body.client_ip);
  createSession(req.body);

  res.status("200").json(req.body);
});
app.post("/new_ride_matching_consumer", (req, res,next) => {
  let o = {
    client_ip: req.body.client_ip,
    consumer_ip: String(req.ip).substr(7),
    consumer_name: req.body.consumer_name,
    consumer_port: req.body.consumer_port,
    client_name: req.body.client_name,
};
  map_arr.push(o);
  // console.log("map_arr", map_arr);
  // console.log('\u001b[31m ansi codes')
  
    console.log(
      "\033[37;40m \u001b[37;1m  Rider \033[37;42m "+o.client_name+" \033[37;41m"+o.client_ip+ "\033[37;40m is matched to Driver \033[37;42m "+ o.consumer_name + "\033[37;41m "+o.consumer_ip+":"+o.consumer_port  + "\033[37;40m");
    
  res.send(req.body);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
