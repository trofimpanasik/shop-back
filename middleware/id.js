import jwt from 'jsonwebtoken'
import 'dotenv/config'
import RError from '../RError.js'

export const idMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(404).json(new RError('Token not found', 61))
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(500).json(new RError('Unauthorized', 62))
    req.userId = Number(decoded.id)
    next()
  })
}