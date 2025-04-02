const express = require("express");
const query = require("../database/taskQueries");
const middleAuth = require("../middlewares/auth");

const taskRouter = express.Router();

taskRouter.put("/update/:user/:type", middleAuth.isAuth, query.updateTask);
taskRouter.post("/create/:user", middleAuth.isAuth, query.createTask);
taskRouter.delete("/delete/:user", middleAuth.isAuth, query.deleteTask);

module.exports = taskRouter;
