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
//   credentials:true,
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://shop-ba9bb.web.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/products', productRouter)
app.use(errorHandler)
app.use('/static', express.static('public'))

server.listen(PORT, () => console.log(`server listening on ${PORT}`))

client.connect().catch(err => console.log(err))