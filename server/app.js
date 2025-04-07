const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const pageRouter = require("./controllers/pageController");
const taskRouter = require("./controllers/taskController");
const projectRouter = require("./controllers/projectController");
const userRouter = require("./controllers/userController");
const errorHandler = require("./middlewares/error");

require("dotenv").config();

const app = express();

const port = process.env.BACKEND_PORT || 4041;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use("/task", taskRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);
app.use("/", pageRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
