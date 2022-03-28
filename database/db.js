const express = require("express");
const { PrismaClient } = require('@prisma/client');

const app = express()

app.use(express.json());

const prisma = new PrismaClient()
app.get('/ride', async (req, res) => {
  const rides = await prisma.ride.findMany()
  res.json(rides)
})
app.post('/ride', async (req, res) => {
  const { cost, pickup, destination,seats,time,name} = req.body
  const ride = await prisma.ride.create({
    data: {
        cost: Number(cost),
        pickup:pickup,
        destination:destination,
        seats:Number(seats),
        time:Number(time),
        name,
    },
  })
  res.json(ride)
})
app.listen(4000, () => console.log('Server started on port 4000'))
