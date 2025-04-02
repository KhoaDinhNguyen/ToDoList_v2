const express = require("express");
const query = require("../database/userQueries");
const middleAuth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/:user", middleAuth.isAuth, query.getUserDatabase);
userRouter.put("/update/:user", middleAuth.isAuth, query.updateUser);

module.exports = userRouter;
