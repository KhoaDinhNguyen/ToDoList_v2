const pool = require("./database");

const updateTask = (req, res, next) => {
  const accountName = req.params.user;
  const type = req.params.type;

  if (type === "pending" || type === "fulfilled") {
    const { projectName, taskName } = req.body;
    const queryString = `CALL ${type}_task('${accountName}', '${projectName}', '${taskName}');`;
    pool.query(queryString, (err, result) => {
      if (err) {
        const error = new Error(err.message);
        error.status = 400;
        next(error);
      } else {
        res.status(200).json({ message: "Update task successfully" });
      }
    });
  } else if (type === "important") {
    const { projectName, taskName, newImportantStatus } = req.body;
    const queryString = `CALL update_task_important('${taskName}', '${projectName}', '${accountName}', '${newImportantStatus}');`;
    pool.query(queryString, (err, result) => {
      if (err) {
        const error = new Error(err.message);
        error.status = 400;
        next(error);
      } else {
        res.status(200).json({ message: "Update task successfully" });
      }
    });
  } else if (type === "info") {
    const {
      projectName,
      taskName,
      newTaskName,
      newTaskDescription,
      newTaskTimeDeadline,
    } = req.body;

    const queryString = `CALL update_task_info('${taskName}', '${projectName}', '${accountName}', '${newTaskName}', '${newTaskDescription}', '${newTaskTimeDeadline}');`;

    pool.query(queryString, (err, result) => {
      if (err) {
        if (
          err.message ===
          'duplicate key value violates unique constraint "tasks_pkey"'
        ) {
          const error = new Error("Duplicate task name in the same project");
          error.status = 400;
          next(error);
        } else {
          const error = new Error(err.message);
          error.status = 400;
          next(error);
        }
      } else {
        res.status(200).json({ message: "Update task successfully" });
      }
    });
  }
};

const createTask = (req, res, next) => {
  const accountName = req.params.user;
  const { taskName, projectName, taskDescription, taskTimeDeadline } = req.body;

  const queryString = `CALL create_task('${taskName}', '${projectName}', '${accountName}', '${taskDescription}', '${taskTimeDeadline}');`;
  pool.query(queryString, (err, result) => {
    if (err) {
      if (
        err.message ===
        'duplicate key value violates unique constraint "tasks_pkey"'
      ) {
        const error = new Error("Duplicate task name in the same project");
        error.status = 400;
        next(error);
      } else {
        const error = new Error(err.message);
        error.status = 400;
        next(error);
      }
    } else {
      res.status(200).json({ message: "Create task successfully" });
    }
  });
};

const deleteTask = (req, res, next) => {
  const accountName = req.params.user;
  const { taskName, projectName } = req.query;

  const queryString = `CALL delete_task('${taskName}', '${projectName}', '${accountName}');`;
  pool.query(queryString, (err, result) => {
    if (err) {
      const error = new Error(err.message);
      error.status = 400;
      next(error);
    } else {
      res.status(200).json({ message: "Delete task successfully" });
    }
  });
};

module.exports = {
  updateTask,
  createTask,
  deleteTask,
};
