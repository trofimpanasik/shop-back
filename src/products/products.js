import Router from 'express'
import 'dotenv/config'
import { client } from '../../db.js'
import RError from '../../RError.js'
import {gen} from "../../flkGen.js";

const Products = client.db('shop').collection('products')
// const upload = multer()
const productRouter = Router()

productRouter.post('/add/', async (req, res) => {
  const body = req.body
  const product = await Products.insertOne({...body, productId: gen()})
  return res.status(200).json(product)
})
productRouter.get('/:category/', async (req, res) => {
  const category = req.params.category
  const products = await Products.find({category: category}).toArray()
  res.json(products)
})
productRouter.get('/product/:id/', async (req, res) => {
  const productId = req.params.id
  const product = await Products.findOne({productId: productId})
  res.json(product)
})

export default productRouter