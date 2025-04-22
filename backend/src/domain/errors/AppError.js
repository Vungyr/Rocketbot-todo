class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest(msg) {
      return new AppError(msg, 400);
    }
    static unauthorized(msg) {
      return new AppError(msg, 401);
    }
    static forbidden(msg) {
      return new AppError(msg, 403);
    }
    static notFound(msg) {
      return new AppError(msg, 404);
    }
  }
  
  module.exports = AppError;
  