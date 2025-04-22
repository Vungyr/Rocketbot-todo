const { handleAuthCallback } = require("../usecases/userUseCases");

async function authCallback(req, res, next) {
  try {
    const code = req.query.code;
    if (!code) throw new Error("Code query param missing");
    const token = await handleAuthCallback(code);
    res.redirect(`http://localhost:3000/?token=${token}`);
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  try { 
    const returnTo = req.query.returnTo || "http://localhost:3000";
    const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(returnTo)}`;
    res.redirect(logoutUrl);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authCallback,
  logout
};
