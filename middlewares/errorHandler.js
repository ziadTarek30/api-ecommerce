const { StatusCodes } = require("http-status-codes");


const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({error: true, message: err.message, stack: err.stack})
  }
  else {
    res.status(err.statusCode).json({error: true, message: err.message})
  }
}

module.exports = errorHandler;