const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  // Clonar y filtrar body para no loguear datos sensibles
  const safeBody = { ...req.body };
  const safeQuery = { ...req.query };
  if (safeBody.password) safeBody.password = '[FILTERED]';
  if (safeBody.token) safeBody.token = '[FILTERED]';
  if (safeQuery.code) safeQuery.code = '[FILTERED]';

  res.on('finish', () => {
    const duration = Date.now() - start;

    const logMessage = [
      `${req.method} ${req.originalUrl}`,
      `Status: ${res.statusCode}`,
      `Duration: ${duration}ms`,
      `Params: ${JSON.stringify(req.params)}`,
      `Query: ${JSON.stringify(req.query)}`,
      `Body: ${JSON.stringify(safeBody)}`
    ].join(' | ');

    logger.info(logMessage);
  });

  next();
};

module.exports = loggerMiddleware;
