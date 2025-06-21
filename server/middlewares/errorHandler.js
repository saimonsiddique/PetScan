// server/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err); // Log the full error stack for debugging

  const statusCode = err.statusCode || 500;
  // Ensure message is a string. If err.message is an object, stringify or take a relevant field.
  let message = 'Internal Server Error';
  if (err.message && typeof err.message === 'string') {
    message = err.message;
  } else if (err.message && typeof err.message === 'object') {
    // Attempt to get a more specific message if the error object has common fields
    message = err.message.msg || err.message.message || JSON.stringify(err.message);
  } else if (typeof err === 'string') { // Sometimes errors are just strings
    message = err;
  }


  // For client-safe messages, you might check a property on the error like err.isOperational
  // For now, we'll send the error message for non-500 errors,
  // and a generic message for 500 errors in a hypothetical 'production' environment.
  // (Assuming NODE_ENV is set, otherwise defaults to generic for 500)

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    // In production, you might not want to send the err.message for 500 errors
    message: (process.env.NODE_ENV === 'production' && statusCode === 500) ? 'Internal Server Error' : message,
    // Optionally, include stack in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
