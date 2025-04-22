const { upsertUser } = require("../infrastructure/db/userRepository");
const AppError = require("../domain/errors/AppError");
const authService = require("../infrastructure/auth/authService");

async function handleAuthCallback(code) {
  const accessToken = await authService.exchangeCodeForToken(code);
  const userInfo = await authService.getUserInfo(accessToken);
  if (!userInfo.sub || !userInfo.email) throw AppError.unauthorized("Invalid user info from Auth0");

  const user = await upsertUser(userInfo.sub, userInfo.email, userInfo.name);
  const jwt = authService.generateJWT({ id: user.id, email: user.email });
  return jwt;
}

module.exports = { handleAuthCallback };
