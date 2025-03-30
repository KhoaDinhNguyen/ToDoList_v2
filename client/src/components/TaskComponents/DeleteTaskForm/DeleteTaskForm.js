import { useDispatch } from "react-redux";

import { fetchTaskDelete } from "../../../API/taskAPI";
import { tasksSlice } from "../../../redux/databaseSlice";

import styles from "./DeleteTaskForm.module.css";

function DeleteTaskForm(props) {
  const dispatch = useDispatch();
  const { task, display, setDeleteDisplay, setTaskDetailDisplay } = props;
  const { taskName, projectName } = task;
  const accountName = localStorage.getItem("accountName");

  const onClickDeleteTaskButton = () => {
    fetchTaskDelete(accountName, projectName, taskName)
      .then((response) => {
        if (!response.error) {
          dispatch(
            tasksSlice.actions.remove({
              taskName,
              projectName,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickCancle = () => {
    setDeleteDisplay(false);
    setTaskDetailDisplay(false);
  };
  return (
    <div style={{ display: display }}>
      <div className={styles.deleteContainer}>
        <p className={styles.deletePrompt}>
          Do you really want to delete this task?
        </p>
        <div className={styles.buttonsContainer}>
          <button
            onClick={onClickDeleteTaskButton}
            className={`${styles.buttonContainer} ${styles.deleteButton}`}
          >
            <span className={styles.title}>Yes</span>
          </button>
          <button
            onClick={onClickCancle}
            className={`${styles.buttonContainer} ${styles.cancleButton}`}
          >
            <span className={styles.title}>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskForm;
