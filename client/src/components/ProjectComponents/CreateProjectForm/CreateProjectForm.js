import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import LoadingModal from "../LoadingModal/LoadingModal.js";
import SuccessModal from "../SuccessModal/SuccessModal.js";
import FailModal from "../FailModal/FailModal.js";
import InputText from "../../utils/InputText/InputText.js";
import InputButton from "../../utils/InputButton/InputButton.js";

import { projectsSlice } from "../../../redux/databaseSlice.js";
import { userSlice } from "../../../redux/userSlice.js";
import { fetchCreateProject } from "../../../API/projectAPI.js";
import {
  convertDateToISOString,
  convertFromBooleanToDisplay,
} from "../../../utils/helperFunctions.js";
import { createProjectFormSlice } from "../../../redux/utilsSlice.js";

import styles from "./CreateProjectForm.module.css";

function CreateProjectForm() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const createProjectFormDisplay = useSelector(
    (state) => state[createProjectFormSlice.name]
  );

  const onChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };
  const onChangeProjectDescription = (event) => {
    setProjectDescription(event.target.value);
  };

  const onClickCloseForm = () => {
    dispatch(createProjectFormSlice.actions.setState(false));
  };

  const onChangeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
  const accountName = useSelector((state) => state[userSlice.name]);
  const today = new Date();
  const todayString = convertDateToISOString(today);

  const onSubmitCreateProject = (event) => {
    event.preventDefault();
    setLoading(true);

    fetchCreateProject(accountName, projectName, projectDescription)
      .then((response) => {
        setLoading(false);
        onChangeMessage("Create project successfully");
        const newProject = {
          projectName,
          projectTimeCreated: todayString,
          projectDescription,
        };
        dispatch(projectsSlice.actions.add(newProject));
        setProjectDescription("");
        setTimeout(() => {
          setProjectName("");
        }, 1000);
        dispatch(createProjectFormSlice.actions.setState(false));
      })
      .catch((err) => {
        setLoading(false);
        onChangeMessage(err.message);
      });
  };

  return (
    <>
      <div
        style={{
          display: convertFromBooleanToDisplay(createProjectFormDisplay),
        }}
      >
        <form className={styles.formContainer}>
          <fieldset>
            <legend>
              <span>Create project form</span>
            </legend>
            <div className={styles.inputsContainer}>
              <InputText
                id="projectName"
                required={true}
                onChangeText={onChangeProjectName}
                valueText={projectName}
                autoComplete={"off"}
                placeholder={"Default"}
                maxLength={50}
                minLength={1}
                labelText={`Project's name\u002a`}
                containerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
                inputStyle={styles.input}
              />
              <InputText
                id="projectDescription"
                required={true}
                onChangeText={onChangeProjectDescription}
                valueText={projectDescription}
                autoComplete={"off"}
                placeholder={"Create to-do list"}
                maxLength={50}
                minLength={1}
                labelText={`Project's description`}
                containerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
                inputStyle={styles.input}
              />
            </div>
            <div className={styles.buttonsContainer}>
              <InputButton
                id="submitCreateProject"
                type={"submit"}
                onClickHandler={onSubmitCreateProject}
                labelText={"New project"}
                containerStyle={styles.submitButton}
                labelStyle={styles.submitButtonLabel}
                inputStyle={styles.submitButtonInput}
              />

              <InputButton
                id="cancelCreateProject"
                type={"button"}
                onClickHandler={onClickCloseForm}
                labelText={"Cancel"}
                containerStyle={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
                inputStyle={styles.cancelButtonInput}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <LoadingModal
        visible={loading === true}
        message={"Create project in process"}
      />
      <SuccessModal
        visible={loading === false && message === "Create project successfully"}
        message={`Create project ${projectName} successfully`}
      />
      <FailModal
        visible={
          loading === false &&
          message !== "" &&
          message !== "Create project successfully"
        }
        message={"Cannot create project"}
        error={message}
      />
    </>
  );
}

export default CreateProjectForm;
