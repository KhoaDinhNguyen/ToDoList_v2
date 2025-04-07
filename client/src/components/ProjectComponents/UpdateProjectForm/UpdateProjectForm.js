import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectsSlice, tasksSlice } from "../../../redux/databaseSlice";
import { userSlice } from "../../../redux/userSlice";
import { fetchUpdateProject } from "../../../API/projectAPI";
import InputText from "../../utils/InputText/InputText";
import InputButton from "../../utils/InputButton/InputButton";

import styles from "./UpdateProjectForm.module.css";

function UpdateProjectForm(props) {
  const { editDisplay, setEditDisplay, setProjectExpansionDisplay, project } =
    props;
  const { projectName, projectDescription, projectTimeCreated } = project;
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [newProjectDescription, setNewProjectDescription] =
    useState(projectDescription);

  const dispatch = useDispatch();

  const accountName = useSelector((state) => state[userSlice]);

  const onClickCancel = () => {
    setEditDisplay(false);
    setProjectExpansionDisplay(false);
  };
  const onChangeProjectName = (event) => {
    setNewProjectName(event.target.value);
  };
  const onChangeProjectDescription = (event) => {
    setNewProjectDescription(event.target.value);
  };

  const onSubmitUpdateProjectInfo = (event) => {
    event.preventDefault();
    fetchUpdateProject(
      projectName,
      accountName,
      newProjectName,
      newProjectDescription
    )
      .then((response) => {
        if (!response.error) {
          setEditDisplay(false);
          setProjectExpansionDisplay(false);
          dispatch(
            projectsSlice.actions.updateInfo({
              projectName,
              newProjectName,
              newProjectDescription,
            })
          );
          dispatch(
            tasksSlice.actions.updateInfoFromProject({
              projectName,
              newProjectName,
            })
          );
        } else {
          alert(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ display: editDisplay }}>
      <form>
        <InputText
          id={`${projectName}_newProjectName`}
          valueText={newProjectName}
          onChangeText={onChangeProjectName}
          labelText={"Project name"}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
        />
        <InputText
          id={`${projectName}_newProjectDescription`}
          valueText={newProjectDescription}
          onChangeText={onChangeProjectDescription}
          labelText={"Project description"}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
        />
        <div className={styles.inputContainer}>
          <p>
            <span>Project time created</span>: {projectTimeCreated}
          </p>
          <p className={styles.message}>
            &#9432; Cannot change project time created
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <InputButton
            id={`submitButtonProject_${projectName}`}
            type={"submit"}
            onClickHandler={onSubmitUpdateProjectInfo}
            labelText={"Apply"}
            inputStyle={styles.buttonInput}
            labelStyle={styles.buttonLabel}
            containerStyle={styles.submitButton}
          />
          <InputButton
            id={`cancelButtonProject_${projectName}`}
            type={"button"}
            onClickHandler={onClickCancel}
            labelText={"Cancle"}
            inputStyle={styles.buttonInput}
            labelStyle={styles.buttonLabel}
            containerStyle={styles.cancelButton}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateProjectForm;
