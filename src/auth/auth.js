import Router from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { client } from '../../db.js'
import bcryptjs from 'bcryptjs'
import { gen } from '../../flkGen.js'
import RError from '../../RError.js'

const authRouter = Router()
const Users = client.db('shop').collection('users')

const JWT_SECRET = process.env.JWT_SECRET

authRouter.get('/auth/', async (req, res) => {
  const token = req.headers.authorization
  if (!token || token === 'null' || token === '' || token === 'undefined') {
    return res.status(401).json(new RError('Unauthorized', 11))
  }

  const decoded = await jwt.verify(token, JWT_SECRET)
  if (!decoded) return res.status(401).json(new RError('Unauthorized', 11))

  const user = await Users.findOne({ userId: Number(decoded.id) })
  if (!user) return res.status(404).json(new RError('User not found', 1))

  delete user.password

  return res.json({ key: jwt.sign({ id: user.userId }, JWT_SECRET, { expiresIn: '7d' }), user })
})

authRouter.post('/login/', async (req, res) => {
  const { email, password } = req.body
  const user = await Users.findOne({ email })
  if (!user) return res.status(404).json(new RError('User not found', 1))

  const isMatch = await bcryptjs.compare(password, user.password)
  if (!isMatch) return res.status(401).json(new RError('Wrong password', 12))

  delete user.password

  return res.json({ key: jwt.sign({ id: user.userId }, JWT_SECRET, { expiresIn: '7d' }), user })
})

authRouter.post('/reg/', async (req, res) => {
  const { email, password } = req.body
  const User = {
    userId: Number(gen()),
    email,
    password,
    firstName: '',
    secondName: '',
    sex: '',
    location: '',
    avatar: 'default.jpg',
  }
  const user = await Users.findOne({ email })
  if (user) return res.status(500).json(new RError('Email is already taken', 14))

  const salt = await bcryptjs.genSalt(10)
  if (!salt) return res.json(new RError('Error in hash generating', 15))

  const hash = await bcryptjs.hash(User.password, salt)
  if (!hash) return res.json(new RError1('Error in hash generating', 15))
  User.password = hash

  await Users.insertOne(User)

  const newUser = { ...User }
  delete newUser.password

  return res.json({ user: newUser, key: jwt.sign({ id: newUser.userId }, JWT_SECRET, { expiresIn: '7d' }) })
})

export default authRouter
