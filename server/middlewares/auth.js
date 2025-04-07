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
    throw new Error("Undefined token");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    // check if user still exists (by database)

    if (decoded.id !== user) {
      throw new Error("Unauthorizaion");
    }
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = {
  isAuth,
};
