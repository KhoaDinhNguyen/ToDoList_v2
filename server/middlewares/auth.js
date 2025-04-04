const jwt = require("jsonwebtoken");
const util = require("util");

const isAuth = async (req, res, next) => {
  const { user } = req.params;
  // getToken
  console.log(req.headers.authorization);
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    return res.status(401).json({ error: true, message: "You are not log in" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // verify token

  try {
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    // check if user still exists (by database)
    console.log(decoded.id);
    console.log(user);
    if (decoded.id !== user) {
      return res
        .status(401)
        .json({ error: true, message: "Please sign in with your account!!!" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: true, message: "Token error" });
  }
};

module.exports = {
  isAuth,
};
