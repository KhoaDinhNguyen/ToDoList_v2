const jwt = require("jsonwebtoken");
const util = require("util");

const isAuth = async (req, res, next) => {
  const { user } = req.params;
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    const err = new Error("Undefined token");
    err.status = 401;
    throw err;
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    if (decoded.id !== user) {
      const err = new Error("Unauthorizaion");
      err.status = 401;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isAuth,
};
