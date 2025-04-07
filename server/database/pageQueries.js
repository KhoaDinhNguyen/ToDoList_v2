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
  pool.query(
    `SELECT password FROM users WHERE name = '${accountName}'`,
    (error, result) => {
      if (error) {
        res.status(400).json({ message: "Database problem", error: true });
      } else if (result.rows.length === 0) {
        res.status(400).json({
          message: "The passord or account name is incorrect",
          error: true,
        });
      } else {
        res.password = result.rows[0].password;
        next();
      }
    }
  );
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

const validateAccountName = async (req, res, next) => {
  const { password, accountName } = req.body;
  try {
    const match = await bcrypt.compare(password, res.password);
    if (match) {
      pool.query(
        `SELECT * FROM users WHERE name = '${accountName}'`,
        (_, result) => {
          // const cookieOptions = {
          //   expires: new Date(
          //     Date.now() + process.env.JWT_COOKIE_EXPIRED_TIME * 1
          //   ),
          //   httpOnly: true,
          // };

          // if (process.env.NODE_ENV === "production")
          //   cookieOptions.secure = true;

          // console.log(cookieOptions);
          const token = signToken(accountName);
          //res.cookie("jwt", token, cookieOptions);
          //console.log(token);
          res.status(200).json({
            ...result.rows[0],
            message: "Found",
            error: false,
            token: token,
          });
        }
      );
    } else {
      res.status(400).json({
        message: "The passord or account name is incorrect",
        error: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createAccount = async (req, res, next) => {
  const { accountName, profileName, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    pool.query(
      `CALL create_user('${accountName}', '${profileName}', '${hashedPassword}')`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err.message, error: true });
        } else {
          res.status(200).json({
            message: "Sign up successfully. Return to login to sign in",
            error: false,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
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

module.exports = {
  getAccountName,
  validateAccountName,
  createAccount,
  findAccountNameExist,
  verifyToken,
};
