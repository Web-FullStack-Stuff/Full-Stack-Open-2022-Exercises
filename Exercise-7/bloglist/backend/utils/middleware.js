const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

///// Logger
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

///////  catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

///////// Error handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

// /// Token extractor
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else {
    request.token = null
  }
  next()
}

// // User Extractor
const userExtractor = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = decodedToken
  }
  else{
    request.user = null
  }
  next()
}

// const userExtractor = async (request, response, next) => {
//   const authorization = request.get('authorization')
//   console.log("auth:",authorization);
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     const decodedToken = jwt.verify(
//       authorization.substring(7),
//       process.env.SECRET
//     )
//     if (decodedToken) {
//       request.user = await User.findById(decodedToken.id)
//     }
//   }
//   next()
// }

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}