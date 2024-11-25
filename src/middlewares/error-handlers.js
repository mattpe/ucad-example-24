import {validationResult} from "express-validator";

const validationErrorHandler = (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    //return res.status(400).json({errors: errors.array()});
    console.log('validation errors', errors.array());
    const errorsString = errors.array().map((item) = {
      // TODO: join 'paths'
    });
    return next(customError('validation errors in: ' + errorsString, 400));
  }
  next();
};

const customError = (message, status) => {
  const error = new Error(message);
  error.status = status || 500;
  return error;
};

/**
 * 404 error handler
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  return next(error); // forward error to error handler
};

/**
* Custom default middleware for handling errors
*/
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
};

export {notFoundHandler, errorHandler, customError, validationErrorHandler};
