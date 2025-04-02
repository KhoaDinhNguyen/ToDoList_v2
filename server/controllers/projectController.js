const express = require("express");
const query = require("../database/projectQueries");
const middleAuth = require("../middlewares/auth");

const projectRouter = express.Router();

projectRouter.post("/create/:user", middleAuth.isAuth, query.createProject);
projectRouter.delete("/delete/:user", middleAuth.isAuth, query.deleteProject);
projectRouter.put("/update/:user", middleAuth.isAuth, query.updateProject);

module.exports = projectRouter;
