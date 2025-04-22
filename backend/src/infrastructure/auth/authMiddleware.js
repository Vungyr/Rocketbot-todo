const AppError = require("../../domain/errors/AppError");
const authService = require("./authService");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw AppError.unauthorized("Authorization header missing");

    const token = authHeader.split(" ")[1];
    if (!token) throw AppError.unauthorized("Token missing");

    const user = authService.verifyJWT(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authMiddleware;
