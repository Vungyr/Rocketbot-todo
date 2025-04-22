require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./errorMiddleware");
const loggerMiddleware = require('../middlewares/loggerMiddleware');
const { sequelize } = require("../db/mysqlClient");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use(express.json());
app.use(loggerMiddleware);
app.use(errorMiddleware);

app.use(routes);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app; // para tests
