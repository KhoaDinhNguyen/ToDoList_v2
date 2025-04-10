const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  let status = err.status || 500;
  return res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
