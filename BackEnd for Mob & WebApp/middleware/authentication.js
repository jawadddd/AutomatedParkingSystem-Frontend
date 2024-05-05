
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader;//.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.locals = { userId: payload.userId, name: payload.name }
    //i have used word user for both admin and user in auth req.body 
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth;
