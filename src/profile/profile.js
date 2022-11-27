import Router from 'express'
import 'dotenv/config'
import { client } from '../../db.js'
// import multer from 'multer'
import path from 'path'
import fs from 'fs'
import RError from '../../RError.js'

const Users = client.db('shop').collection('users')
// const upload = multer()
const profileRouter = Router()

profileRouter.get('/user/:id/', async (req, res) => {
  const user = await Users.findOne({ userId: Number(req.params.id) })
  if (!user) return res.status(404).json(new RError('User not found', 1))

  delete user?.password

  return res.json(user)
})

profileRouter.get('/list/', async (req, res) => {
  const { users } = req.body
  const usersList = []

  for (const id of users) {
    const user = (await Users.findOne({ userId: Number(id) }))
    if (!user) return res.status(404).json(new RError('User not found', 1))
    delete user.password
    usersList.push(user)
  }

  return res.json(usersList)
})

profileRouter.patch('/', async (req, res) => {
  let user = await Users.findOne({ userId: Number(req.body.userId) })
  if (!user) return res.status(404).json(new RError('User not found', 1))

  await Users.updateOne({ userId: Number(req.body.userId) }, { $set: req.body })

  user = { ...user, ...req.body }

  res.json(user)
})

// profileRouter.post('/avatar/', upload.single('image'), async (req, res) => {
//   const file = req.file
//   if (!['.jpg', '.jpeg', '.png', 'webp', '.svg'].find(i => i === path.extname((file.originalname)).toLowerCase())) {
//     return res.status(422).json(new RError('Invalid file type', 22))
//   } else {
//     const name = `${gen()}${path.extname(file.originalname)}`
//
//     const user = await Users.findOne({ userId: Number(req.userId) })
//     if (!user) return res.status(404).json(new RError('User not found', 1))
//     await Users.updateOne({ userId: Number(req.userId) }, { $set: { avatar: name } })
//
//     await fs.writeFile(`public/images/${name}`, file.buffer, 'binary', err => {
//       if (err) return res.json(new RError('Error while uploading file', 23))
//       else return res.json(name)
//     })
//   }
// })

export default profileRouter