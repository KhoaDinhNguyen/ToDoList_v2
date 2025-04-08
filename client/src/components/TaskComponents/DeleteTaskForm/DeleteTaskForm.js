import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { fetchTaskDelete } from "../../../API/taskAPI";
import { tasksSlice } from "../../../redux/databaseSlice";
import { userSlice } from "../../../redux/userSlice";

import styles from "./DeleteTaskForm.module.css";

function DeleteTaskForm(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { task, display, setDeleteDisplay, setTaskDetailDisplay } = props;
  const { taskName, projectName } = task;
  const accountName = useSelector((state) => state[userSlice.name]);

  const onClickDeleteTaskButton = () => {
    setLoading(true);
    setMessage("Delete task in process");

    fetchTaskDelete(accountName, projectName, taskName)
      .then((response) => {
        if (!response.error) {
          setMessage("Delete task successfully");
          setTimeout(() => {
            setMessage("");
            dispatch(
              tasksSlice.actions.remove({
                taskName,
                projectName,
              })
            );
          }, 2000);
          setLoading(false);
        } else {
          setMessage(response.message);
          setTimeout(() => {
            setMessage("");
          }, 2000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setMessage(err.message);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  };
  const onClickCancle = () => {
    setDeleteDisplay(false);
    setTaskDetailDisplay(false);
  };
  return (
    <>
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
      <LoadingModal visible={loading === true} message={message} />
      <SuccessModal
        visible={loading === false && message === "Delete task successfully"}
        message={message}
      />
      <FailModal
        visible={
          loading === false &&
          message !== "" &&
          message !== "Delete task successfully"
        }
        message={"Cannot delete task"}
        error={message}
      />
    </>
  );
}

export default DeleteTaskForm;
