const jwt = require("jsonwebtoken");
const axios = require("axios");
const AppError = require("../../domain/errors/AppError");

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL;
const JWT_SECRET = process.env.JWT_SECRET;

async function exchangeCodeForToken(code) {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    grant_type: "authorization_code",
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    code,
    redirect_uri: AUTH0_CALLBACK_URL,
  });
  return response.data.access_token;
}

async function getUserInfo(accessToken) {
  const response = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

function generateJWT(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw AppError.unauthorized("Invalid token");
  }
}

module.exports = { exchangeCodeForToken, getUserInfo, generateJWT, verifyJWT };
