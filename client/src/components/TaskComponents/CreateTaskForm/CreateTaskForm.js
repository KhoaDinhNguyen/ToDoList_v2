import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputText from "../../utils/InputText/InputText";
import InputDate from "../../utils/InputDate/InputDate";
import InputButton from "../../utils/InputButton/InputButton";
import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { tasksSlice } from "../../../redux/databaseSlice";
import { userSlice } from "../../../redux/userSlice";
import { fetchTaskCreate } from "../../../API/taskAPI";
import {
  convertDateToISOString,
  convertFromBooleanToDisplay,
} from "../../../utils/helperFunctions";

import styles from "./CreateTaskForm.module.css";

function CreateTaskForm(props) {
  const dispatch = useDispatch();
  const { projectName } = props;
  const today = new Date();
  const accountName = useSelector((state) => state[userSlice.name]);
  const [createTaskFormDisplay, setCreateTaskFormDisplay] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTimeDeadline, setTimeDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setLoading(true);
    setMessage("Create task in process");
    fetchTaskCreate(
      accountName,
      projectName,
      taskName,
      taskDescription,
      taskTimeDeadline
    )
      .then((response) => {
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
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          setTaskName("");
        }, 1000);
        setLoading(false);
        setTaskDescription("");
        setTimeDeadline("");
        setCreateTaskFormDisplay(false);
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
              required={false}
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
                onClickHandler={onSubmit}
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
      <LoadingModal visible={loading} message={message} />
      <SuccessModal
        visible={message === "Create task successfully" && !loading}
        message={`Create task ${taskName} successfully`}
      />
      <FailModal
        visible={
          message !== "" && message !== "Create task successfully" && !loading
        }
        message={"Cannot create task"}
        error={message}
      />
    </>
  );
}

export default CreateTaskForm;
