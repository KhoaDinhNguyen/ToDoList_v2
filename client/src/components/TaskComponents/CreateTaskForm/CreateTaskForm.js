import { useState } from "react";
import { useDispatch } from "react-redux";

import { tasksSlice } from "../../../redux/databaseSlice";
import { fetchTaskCreate } from "../../../API/taskAPI";
import { convertDateToISOString } from "../../../pages/user/User";
import { convertFromBooleanToDisplay } from "../../../pages/user/User";
import InputText from "../../utils/InputText/InputText";
import InputDate from "../../utils/InputDate/InputDate";
import InputButton from "../../utils/InputButton/InputButton";
import Modal from "../../utils/Modal/Modal";

import styles from "./CreateTaskForm.module.css";

function CreateTaskForm(props) {
  const dispatch = useDispatch();
  const { projectName } = props;
  const accountName = localStorage.getItem("accountName");
  const today = new Date();

  const [createTaskFormDisplay, setCreateTaskFormDisplay] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTimeDeadline, setTimeDeadline] = useState("");

  const onChangeTaskName = (event) => {
    setTaskName(event.target.value);
  };
  const onChangeTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };
  const onChangeTaskDeadline = (event) => {
    setTimeDeadline(event.target.value);
  };
  const onClickToggleCreateTaskButton = () => {
    setCreateTaskFormDisplay(!createTaskFormDisplay);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    try {
      fetchTaskCreate(
        accountName,
        projectName,
        taskName,
        taskDescription,
        taskTimeDeadline
      )
        .then((response) => {
          alert(response.message);
          if (!response.error) {
            dispatch(
              tasksSlice.actions.add({
                taskName,
                taskStatus: "pending",
                taskDescription,
                taskTimeCreated: convertDateToISOString(today),
                taskTimeDeadline,
                projectName,
              })
            );
            setTaskName("");
            setTaskDescription("");
            setTimeDeadline("");
            setCreateTaskFormDisplay(false);
          }
        })
        .catch((response) => {
          console.log(response.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <div
          className={styles.promptText}
          style={{
            display: convertFromBooleanToDisplay(!createTaskFormDisplay),
          }}
          onClick={onClickToggleCreateTaskButton}
        >
          <p>+ Create new task</p>
        </div>
        <form
          style={{
            display: convertFromBooleanToDisplay(createTaskFormDisplay),
          }}
          onSubmit={onSubmit}
          className={styles.formContainer}
        >
          <fieldset>
            <legend>Create task form</legend>
            <InputText
              containerStyle={styles.inputContainer}
              id={`${projectName}_taskName`}
              required={true}
              onChangeText={onChangeTaskName}
              valueText={taskName}
              autoComplete="off"
              labelText="Task name"
            />
            <InputText
              containerStyle={styles.inputContainer}
              id={`${projectName}_taskDescription`}
              required={true}
              onChangeText={onChangeTaskDescription}
              valueText={taskDescription}
              autoComplete="off"
              labelText="Task description"
            />
            <InputDate
              containerStyle={styles.inputContainer}
              id={`${projectName}_taskTimeDeadline`}
              required={true}
              onChangeText={onChangeTaskDeadline}
              valueText={taskTimeDeadline}
              labelText="Task deadline"
              min={convertDateToISOString(today)}
            />
            <div className={styles.inputContainer}>
              <p>
                <span>Project name:</span> {projectName}
              </p>
            </div>
            <div className={styles.buttonsContainer}>
              <InputButton
                containerStyle={styles.sumbitContainer}
                type={"submit"}
                id={`${projectName}_${taskName}_submitButton`}
                onClickHandler={onClickToggleCreateTaskButton}
                labelText="New task"
                labelStyle={styles.buttonLabel}
              />
              <InputButton
                containerStyle={styles.cancelButtonContainer}
                type={"button"}
                id={`${projectName}_${taskName}_cancelButton`}
                onClickHandler={onClickToggleCreateTaskButton}
                labelText="Cancel"
                labelStyle={styles.buttonLabel}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default CreateTaskForm;
