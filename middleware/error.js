import RError from '../RError.js'

export const errorHandler = (err, req, res) => {
  return res.status(500).json(new RError(err.message, 500))
}