const express = require("express");
const query = require("../database/userQueries");

const userRouter = express.Router();

userRouter.get("/:user", query.getUserDatabase);
userRouter.put("/update/:user", query.updateUser);

module.exports = userRouter;
