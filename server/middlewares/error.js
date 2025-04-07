const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  console.log(err.message);
  if (err.message === "Undefined token" || err.message === "Unauthorizaion") {
    return res.status(status).json({ message: err.message });
  }

  return res.status(status).json({ message: "Error" });
};

module.exports = errorHandler;
