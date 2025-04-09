import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputText from "../../utils/InputText/InputText";
import InputButton from "../../utils/InputButton/InputButton";
import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../../TaskComponents/FailModal/FailModal";

import { projectsSlice, tasksSlice } from "../../../redux/databaseSlice";
import { userSlice } from "../../../redux/userSlice";
import { fetchUpdateProject } from "../../../API/projectAPI";

import styles from "./UpdateProjectForm.module.css";

function UpdateProjectForm(props) {
  const { editDisplay, setEditDisplay, setProjectExpansionDisplay, project } =
    props;
  const { projectName, projectDescription, projectTimeCreated } = project;
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [newProjectDescription, setNewProjectDescription] =
    useState(projectDescription);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const accountName = useSelector((state) => state[userSlice.name]);

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

  const onChangeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
  const onSubmitUpdateProjectInfo = (event) => {
    event.preventDefault();
    setLoading(true);

    fetchUpdateProject(
      projectName,
      accountName,
      newProjectName,
      newProjectDescription
    )
      .then((response) => {
        setLoading(false);
        if (!response.error) {
          setLoading(false);
          onChangeMessage("Edit project successfully");
          setTimeout(() => {
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
            setProjectExpansionDisplay(false);
            setEditDisplay(false);
          }, 1000);
        } else {
          setLoading(false);
          onChangeMessage(response.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        onChangeMessage(err.message);
      });
  };
  return (
    <>
      {" "}
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
      <LoadingModal
        visible={loading === true}
        message={"Edit project in process"}
      />
      <SuccessModal
        visible={loading === false && message === "Edit project successfully"}
        message={
          "Edit project successfully. The project will update in seconds"
        }
      />
      <FailModal
        visible={
          !loading && message !== "" && message !== "Edit project successfully"
        }
        message={"Cannot edit task"}
        error={message}
      />
    </>
  );
}

export default UpdateProjectForm;
