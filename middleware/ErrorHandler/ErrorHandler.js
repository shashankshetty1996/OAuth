function errorHandler(res, error, status = 404) {
  return res.status(status).json({ message: error });
}

module.exports = errorHandler;
