import { MongoClient } from 'mongodb'
// import 'dotenv/config'

export const client = new MongoClient('mongodb+srv://turizm:g7446!BS9bu4vUf@shop.rq8wc8p.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, connectTimeoutMS: 30000, keepAlive: false })
