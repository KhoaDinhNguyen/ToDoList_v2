const pool = require("./database");

const createProject = (req, res, next) => {
  const accountName = req.params.user;
  const projectName = req.body.projectName;
  const projectDescription = req.body.projectDescription;

  const queryString = `CALL insert_project('${projectName}','${accountName}', CURRENT_DATE, '${projectDescription}');`;

  pool.query(queryString, (err, result) => {
    if (err) {
      if (
        err.message ===
        `duplicate key value violates unique constraint "projects_pkey"`
      ) {
        const error = new Error("Project name duplicated");
        error.status = 400;
        next(error);
      } else {
        const error = new Error(err.message);
        error.status = 500;
        next(error);
      }
    } else {
      res.status(200).json({ message: "Create project successfully" });
    }
  });
};

const deleteProject = (req, res, next) => {
  const accountName = req.params.user;
  const { projectName } = req.query;

  const queryString = `CALL delete_project('${projectName}', '${accountName}');`;
  pool.query(queryString, (err, result) => {
    if (err) {
      const error = new Error(err.message);
      error.status = 500;
      next(error);
    } else {
      res.status(200).json({ message: "Delete project successfully" });
    }
  });
};

const updateProject = (req, res, next) => {
  const accountName = req.params.user;
  const { projectName } = req.query;
  const { newProjectName, newProjectDescription } = req.body;

  const queryString = `CALL update_project('${projectName}', '${accountName}', '${newProjectName}', '${newProjectDescription}');`;
  pool.query(queryString, (err, result) => {
    if (err) {
      if (
        err.message ===
        'duplicate key value violates unique constraint "projects_pkey"'
      ) {
        const error = new Error("Can not have the same project name");
        error.status = 400;
        next(error);
      } else {
        const error = new Error(err.message);
        error.status = 500;
        next(error);
      }
    } else {
      res.status(200).json({ message: "Update project sucessfully" });
    }
  });
};
module.exports = {
  createProject,
  deleteProject,
  updateProject,
};
