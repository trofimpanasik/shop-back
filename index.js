import express from 'express'
import httpServer from 'http'
import cors from 'cors'
import { client } from './db.js'
import 'dotenv/config'

import authRouter from './src/auth/auth.js'
import profileRouter from "./src/profile/profile.js";
import productRouter from "./src/products/products.js";

import { errorHandler } from './middleware/error.js'

const app = express()
const server = httpServer.createServer(app)
const PORT = process.env.PortServer

//const whitelist = ["http://localhost:5173", "https://shop-ba9bb.web.app"]
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}
app.use(allowCors(handler))
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/products', productRouter)
app.use(errorHandler)
app.use('/static', express.static('public'))

server.listen(PORT, () => console.log(`server listening on ${PORT}`))

client.connect().catch(err => console.log(err))