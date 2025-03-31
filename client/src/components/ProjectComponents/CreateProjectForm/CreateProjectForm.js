import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { projectsSlice } from "../../../redux/databaseSlice.js";
import { fetchCreateProject } from "../../../API/projectAPI.js";
import {
  convertDateToISOString,
  convertFromBooleanToDisplay,
} from "../../../pages/user/User.js";
import { profileNameSlice } from "../../../redux/databaseSlice.js";
import { createProjectFormSlice } from "../../../redux/utilsSlice.js";
import InputText from "../../utils/InputText/InputText.js";
import InputButton from "../../utils/InputButton/InputButton.js";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal.js";

import styles from "./CreateProjectForm.module.css";

function CreateProjectForm() {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [message, setMessage] = useState("");
  const createProjectFormDisplay = useSelector(
    (state) => state[createProjectFormSlice.name]
  );

  const onChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };
  const onChangeProjectDescription = (event) => {
    setProjectDescription(event.target.value);
  };
  const onClickCloseDialog = () => {
    setMessage("");
  };
  const onClickCloseForm = () => {
    dispatch(createProjectFormSlice.actions.setState(false));
  };

  const profileName = useSelector((state) => state[profileNameSlice.name]);

  const accountName = localStorage.getItem("accountName");
  const today = new Date();
  const todayString = convertDateToISOString(today);

  const onSubmitCreateProject = (event) => {
    event.preventDefault();

    fetchCreateProject(accountName, projectName, projectDescription)
      .then((response) => {
        setMessage(response.message);
        if (!response.error) {
          const newProject = {
            projectName,
            projectTimeCreated: todayString,
            projectDescription,
          };
          dispatch(projectsSlice.actions.add(newProject));
          setProjectName("");
          setProjectDescription("");
          dispatch(createProjectFormSlice.actions.setState(false));
        }
      })
      .catch((err) => {
        console.log(err);
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
      <CreateProjectModal
        message={message}
        onClickCloseDialog={onClickCloseDialog}
      />
    </>
  );
}

export default CreateProjectForm;
