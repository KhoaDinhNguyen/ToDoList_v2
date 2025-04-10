import { useDispatch } from "react-redux";
import { useState } from "react";

import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { fetchDeleteProject } from "../../../API/projectAPI";
import { tasksSlice, projectsSlice } from "../../../redux/databaseSlice";

import styles from "./DeleteProjectForm.module.css";

function DeleteProjectForm(props) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    accountName,
    projectName,
    deleteDisplay,
    setDeleteDisplay,
    setProjectExpansionDisplay,
  } = props;

  const onClickDeleteProject = () => {
    setLoading(true);
    setMessage("Delete project in process");

    fetchDeleteProject(accountName, projectName)
      .then((response) => {
        setLoading(false);
        onChangeMessage(response.message);
        setTimeout(() => {
          dispatch(tasksSlice.actions.removeFromProject(projectName));
          dispatch(projectsSlice.actions.remove(projectName));
          setProjectExpansionDisplay(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        onChangeMessage(err.message);
      });
  };
  const onClickCancle = () => {
    setDeleteDisplay(false);
    setProjectExpansionDisplay(false);
  };

  const onChangeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
  return (
    <>
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
      <LoadingModal visible={loading} message={message} />
      <SuccessModal
        visible={!loading && message === "Delete project successfully"}
        message={message}
      />
      <FailModal
        visible={
          !loading &&
          message !== "" &&
          message !== "Delete project successfully"
        }
        error={"Cannot delete project"}
        message={message}
      />
    </>
  );
}

export default DeleteProjectForm;
