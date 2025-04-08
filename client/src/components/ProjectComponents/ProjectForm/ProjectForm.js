import UpdateProjectForm from "../UpdateProjectForm/UpdateProjectForm";
import DeleteProjectForm from "../DeleleProjectForm/DeleteProjectForm";
import InfoText from "../../utils/InfoText/InfoText";

import { convertFromBooleanToDisplay } from "../../../utils/helperFunctions";

import styles from "./ProjectForm.module.css";

function ProjectForm({
  projectDescriptionDisplay,
  editDisplay,
  setDeleteDisplay,
  setEditDisplay,
  project,
  setProjectExpansionDisplay,
  deleteDisplay,
  accountName,
  projectName,
  projectExpansionDisplay,
}) {
  return (
    <div
      className={`${styles.rootContainer} ${
        !projectExpansionDisplay ? styles.rootHidden : styles.rootVisible
      }`}
    >
      <ProjectDescription
        project={project}
        projectDescriptionDisplay={projectDescriptionDisplay}
      />
      <UpdateProjectForm
        editDisplay={convertFromBooleanToDisplay(editDisplay)}
        setEditDisplay={setEditDisplay}
        project={project}
        setProjectExpansionDisplay={setProjectExpansionDisplay}
      />
      <DeleteProjectForm
        accountName={accountName}
        projectName={projectName}
        deleteDisplay={convertFromBooleanToDisplay(deleteDisplay)}
        setDeleteDisplay={setDeleteDisplay}
        setProjectExpansionDisplay={setProjectExpansionDisplay}
      />
    </div>
  );
}

export default ProjectForm;

function ProjectDescription(props) {
  const { project, projectDescriptionDisplay } = props;
  const { projectName, projectDescription, projectTimeCreated } = project;

  return (
    <div
      className={styles.projectDescription}
      style={{
        display: convertFromBooleanToDisplay(projectDescriptionDisplay),
      }}
    >
      <InfoText title={"Project name"}>
        <p>{projectName}</p>
      </InfoText>
      <InfoText title={"Project description"}>
        <p>{projectDescription}</p>
      </InfoText>
      <InfoText title={"Project time created"}>
        <p>{projectTimeCreated}</p>
      </InfoText>
    </div>
  );
}
