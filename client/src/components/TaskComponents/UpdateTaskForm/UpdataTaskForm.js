import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputText from "../../utils/InputText/InputText";
import InputDate from "../../utils/InputDate/InputDate";
import InputButton from "../../utils/InputButton/InputButton";
import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { tasksSlice } from "../../../redux/databaseSlice";
import { featchTaskUpdateInfo } from "../../../API/taskAPI";
import { convertDateToISOString } from "../../../utils/helperFunctions";
import { userSlice } from "../../../redux/userSlice";

import styles from "./UpdateTaskForm.module.css";

function UpdateTaskForm(props) {
  const { task, display, setEditDisplay, setTaskDetailDisplay } = props;
  const {
    taskName,
    taskDescription,
    taskTimeDeadline,
    taskTimeCreated,
    projectName,
  } = task;
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newTaskDescription, setNewTaskDescription] = useState(taskDescription);
  const [newTaskTimeDeadline, setNewTaskTimeDeadline] =
    useState(taskTimeDeadline);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const accountName = useSelector((state) => state[userSlice.name]);
  const onClickCancle = () => {
    setEditDisplay(false);
    setTaskDetailDisplay(false);
  };
  const onChangeTaskName = (event) => {
    setNewTaskName(event.target.value);
  };
  const onChangeTaskDescription = (event) => {
    setNewTaskDescription(event.target.value);
  };
  const onChangeTaskDeadline = (event) => {
    setNewTaskTimeDeadline(event.target.value);
  };

  const today = new Date();

  const onSubmitUpdateTaskInfo = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("Edit task in process");
    featchTaskUpdateInfo(
      taskName,
      projectName,
      accountName,
      newTaskName,
      newTaskDescription,
      newTaskTimeDeadline
    )
      .then((response) => {
        setLoading(false);
        setMessage("Update task successfully");
        setTimeout(() => {
          setMessage("");
          dispatch(
            tasksSlice.actions.updateInfo({
              taskName,
              projectName,
              accountName,
              newTaskName,
              newTaskDescription,
              newTaskTimeDeadline,
            })
          );
        }, 1000);
        setEditDisplay(false);
        setTaskDetailDisplay(false);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
  };
  return (
    <>
      <div className={styles.rootContainer} style={{ display: display }}>
        <form>
          <InputText
            id={`${taskName}_${projectName}_editTaskName`}
            labelText="Task name"
            valueText={newTaskName}
            onChangeText={onChangeTaskName}
            containerStyle={styles.inputContainer}
          />
          <InputText
            id={`${taskName}_${projectName}_editTaskDescription`}
            labelText="Task description"
            valueText={newTaskDescription}
            onChangeText={onChangeTaskDescription}
            containerStyle={styles.inputContainer}
          />
          <div className={styles.inputContainer}>
            <p>
              <span>Task time created:</span> {taskTimeCreated}
            </p>
          </div>
          <InputDate
            id={`${projectName}_editTaskDeadline`}
            required={true}
            onChangeText={onChangeTaskDeadline}
            valueText={taskTimeDeadline}
            labelText="Task deadline"
            min={convertDateToISOString(today)}
            containerStyle={styles.inputContainer}
          />
          <div className={styles.inputContainer}>
            <p>
              <span>Task's project name:</span> {projectName}
            </p>
          </div>

          <p className={styles.notice}>
            &#9432; Cannot change task time created and task's project
          </p>
          <div className={styles.buttonsContainer}>
            <InputButton
              type={"submit"}
              id={`${projectName}_${taskName}_editSubmitButton`}
              onClickHandler={onSubmitUpdateTaskInfo}
              labelText="Apply"
              labelStyle={styles.buttonLabel}
              containerStyle={styles.submitButton}
            />
            <InputButton
              type={"button"}
              id={`${projectName}_${taskName}_editCancelButton`}
              onClickHandler={onClickCancle}
              labelText="Cancle"
              labelStyle={styles.buttonLabel}
              containerStyle={styles.cancelButton}
            />
          </div>
        </form>
      </div>
      <LoadingModal visible={loading} message={message} />
      <SuccessModal
        visible={!loading && message === "Update task successfully"}
        message={
          "Update task successfully. New version will be display in seconds."
        }
      />
      <FailModal
        visible={
          !loading && message !== "Update task successfully" && message !== ""
        }
        message={"Cannot edit task"}
        error={message}
      />
    </>
  );
}

export default UpdateTaskForm;
