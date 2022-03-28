import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
app.get('/ride', async (req, res) => {
  const rides = await prisma.ride.findMany()
  res.json(rides)
})
app.post('/ride', async (req, res) => {
  const { cost, pickup, destination,seats,time } = req.body
  const ride = await prisma.ride.create({
    data: {
        cost,
        pickup,
        destination,
        seats,
        time,
    },
  })
  res.json(ride)
})
app.listen(4000, () => console.log('Server started on port 4000'))
