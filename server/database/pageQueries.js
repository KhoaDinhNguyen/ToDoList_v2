const jwt = require("jsonwebtoken");
const pool = require("./database");
const bcrypt = require("bcrypt");
const util = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_TIME,
  });
};

const getAccountName = (req, res, next) => {
  const { accountName } = req.body;

  const queryString = `SELECT * FROM users WHERE name = '${accountName}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
      const error = new Error(err.message);
      error.status = 501;
      next(error);
    } else if (result.rows.length === 0) {
      const error = new Error("The password or account name is incorrect");
      error.status = 400;
      next(error);
    } else {
      req.password = result.rows[0].password;
      req.name = result.rows[0].name;
      req.full_name = result.rows[0].full_name;
      next();
    }
  });
};

const validateAccountName = async (req, res, next) => {
  const { password, accountName } = req.body;

  const match = await bcrypt.compare(password, req.password);

  if (match) {
    const token = signToken(accountName);
    res.status(200).json({
      name: req.name,
      full_name: req.full_name,
      token: token,
    });
  } else {
    const error = new Error("The passord or account name is incorrect");
    error.status = 400;
    next(error);
  }
};

const createAccount = async (req, res, next) => {
  const { accountName, profileName, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const queryString = `CALL create_user('${accountName}', '${profileName}', '${hashedPassword}')`;

  pool.query(queryString, (err, result) => {
    if (err) {
      const error = new Error(err.message);
      error.status = 501;
      next(error);
    } else {
      res.status(200).json({
        message: "Sign up successfully. Return to login to sign in",
      });
    }
  });
};

const verifyToken = async (req, res, next) => {
  // getToken
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    return res.status(401).json({ message: "You are not log in" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // verify token
  try {
    //console.log(process.env.JWT_SECRET);
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    // check if user still exists (by database)

    return res
      .status(200)
      .json({ id: decoded.id, message: "Token verification success" });
  } catch (err) {
    return res.status(401).json({ message: "Token error" });
  }
};

const findAccountNameExist = (req, res, next) => {
  const { accountName } = req.body;
  pool.query(
    `SELECT * FROM users WHERE name = '${accountName}';`,
    (error, result) => {
      if (error) {
        res.status(400).json({ message: "Database problem", error: true });
      } else if (result.rows.length === 0) {
        res
          .status(400)
          .json({ message: "Cannot find account name", error: true });
      } else {
        res.status(200).json({ message: "Account name exists", error: false });
      }
    }
  );
};

module.exports = {
  getAccountName,
  validateAccountName,
  createAccount,
  findAccountNameExist,
  verifyToken,
};
