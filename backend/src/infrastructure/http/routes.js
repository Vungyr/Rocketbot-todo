const express = require("express");
const authController = require("../../controllers/authController");
const taskController = require("../../controllers/taskController");
const authMiddleware = require("../auth/authMiddleware");

const router = express.Router();

router.get("/auth/login", (req, res) => {
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const redirectUri = process.env.AUTH0_CALLBACK_URL;
  const url = `https://${auth0Domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid profile email`;
  res.redirect(url);
});

router.get('/auth/logout', authController.logout);

router.get("/auth/callback", authController.authCallback);

router.post("/tasks", authMiddleware, taskController.createTask);
router.get("/tasks", authMiddleware, taskController.listTasks);
router.put("/tasks/:id", authMiddleware, taskController.updateTask);
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
