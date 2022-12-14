import express from 'express'
import httpServer from 'http'
import cors from 'cors'
import { client } from './db.js'
import 'dotenv/config'

import authRouter from './src/auth/auth.js'
import profileRouter from "./src/profile/profile.js";
import productRouter from "./src/products/products.js";

import { errorHandler } from './middleware/error.js'
import path from "path";

const app = express()
const server = httpServer.createServer(app)
const PORT = process.env.PortServer

//const whitelist = ["http://localhost:5173", "https://shop-ba9bb.web.app"]

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/products', productRouter)
app.use('/static', express.static('public'))

app.get('/test', (req, res) => {
  res.send("<div>test</div>");
})
server.listen(PORT, '10.100.31.123', () => console.log(`server listening on ${PORT}`))

client.connect().catch(err => console.log(err))