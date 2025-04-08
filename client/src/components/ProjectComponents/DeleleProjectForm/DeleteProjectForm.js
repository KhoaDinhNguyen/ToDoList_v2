import { useDispatch } from "react-redux";

import { fetchDeleteProject } from "../../../API/projectAPI";
import styles from "./DeleteProjectForm.module.css";
import { tasksSlice, projectsSlice } from "../../../redux/databaseSlice";

function DeleteProjectForm(props) {
  const dispatch = useDispatch();
  const {
    accountName,
    projectName,
    deleteDisplay,
    setDeleteDisplay,
    setProjectExpansionDisplay,
  } = props;

  const onClickDeleteProject = () => {
    fetchDeleteProject(accountName, projectName)
      .then((response) => {
        dispatch(tasksSlice.actions.removeFromProject(projectName));
        dispatch(projectsSlice.actions.remove(projectName));
        setProjectExpansionDisplay(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickCancle = () => {
    setDeleteDisplay(false);
    setProjectExpansionDisplay(false);
  };

  return (
    <div style={{ display: deleteDisplay }} className={styles.rootContainer}>
      <div className={styles.promptContainer}>
        <p>Do you really want to delete this project?</p>
        <p className={styles.notice}>
          &#9432; All tasks will be removed followedly
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          onClick={onClickDeleteProject}
          className={`${styles.buttonContainer} ${styles.submitButton}`}
        >
          <span>Yes, I want to delete it</span>
        </button>
        <button
          onClick={onClickCancle}
          className={`${styles.buttonContainer} ${styles.cancelButton}`}
        >
          <span>No, I think I will keep it</span>
        </button>
      </div>
    </div>
  );
}

export default DeleteProjectForm;
