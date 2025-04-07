import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tasksSlice } from "../../../redux/databaseSlice";
import { featchTaskUpdateInfo } from "../../../API/taskAPI";
import InputText from "../../utils/InputText/InputText";
import InputDate from "../../utils/InputDate/InputDate";
import InputButton from "../../utils/InputButton/InputButton";
import { convertDateToISOString } from "../../../pages/user/User";
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
    featchTaskUpdateInfo(
      taskName,
      projectName,
      accountName,
      newTaskName,
      newTaskDescription,
      newTaskTimeDeadline
    )
      .then((response) => {
        if (!response.error) {
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
          setEditDisplay(false);
          setTaskDetailDisplay(false);
        } else {
          alert(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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
  );
}

export default UpdateTaskForm;
