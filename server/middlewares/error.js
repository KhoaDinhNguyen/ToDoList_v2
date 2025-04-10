const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  return res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
