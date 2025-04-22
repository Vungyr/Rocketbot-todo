function errorMiddleware(err, req, res, next) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  module.exports = errorMiddleware;
  