import { MongoClient } from 'mongodb'
import 'dotenv/config'

export const client = new MongoClient(process.env.dbURL, { useUnifiedTopology: true, useNewUrlParser: true, connectTimeoutMS: 30000, keepAlive: false })
