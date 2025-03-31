import { useState } from "react";

import ProjectHeader from "../ProjectHeader/ProjectHeader";
import ProjectForm from "../ProjectForm/ProjectForm";
import ArrayTasks from "../ArrayTasks/ArrayTasks";

import styles from "./Project.module.css";

function Project(props) {
  const {
    unfinishedTasksRender,
    project,
    finishedTasksRender,
    numOfFailingTask,
    numOfFulfilledTask,
    numOfPendingTask,
  } = props;
  const [projectExpansionDisplay, setProjectExpansionDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [projectDescriptionDisplay, setProjectDescriptionDisplay] =
    useState(false);
  const [taskListDisplay, setTaskListDisplay] = useState(true);
  const { projectName } = project;
  const accountName = localStorage.getItem("accountName");

  const onClickTaskListDisplay = () => {
    setTaskListDisplay(!taskListDisplay);
  };

  const onClickProjectDescriptionDisplay = () => {
    if (
      projectExpansionDisplay === true &&
      projectDescriptionDisplay === true
    ) {
      setProjectExpansionDisplay(false);
    } else {
      setProjectExpansionDisplay(true);
      setProjectDescriptionDisplay(true);
      setEditDisplay(false);
      setDeleteDisplay(false);
    }
  };

  const onClickEditDisplay = () => {
    if (projectExpansionDisplay === true && editDisplay === true) {
      setProjectExpansionDisplay(false);
    } else {
      setProjectExpansionDisplay(true);
      setEditDisplay(true);
      setProjectDescriptionDisplay(false);
      setDeleteDisplay(false);
    }
  };

  const onClickDeleteDisplay = () => {
    if (projectExpansionDisplay === true && deleteDisplay === true) {
      setProjectExpansionDisplay(false);
    } else {
      setProjectExpansionDisplay(true);
      setDeleteDisplay(true);
      setProjectDescriptionDisplay(false);
      setEditDisplay(false);
    }
  };

  return (
    <li className={styles.rootContainer}>
      <ProjectHeader
        numOfFailingTask={numOfFailingTask}
        numOfFulfilledTask={numOfFulfilledTask}
        numOfPendingTask={numOfPendingTask}
        projectName={projectName}
        onClickDeleteDisplay={onClickDeleteDisplay}
        onClickEditDisplay={onClickEditDisplay}
        onClickProjectDescriptionDisplay={onClickProjectDescriptionDisplay}
        onClickTaskListDisplay={onClickTaskListDisplay}
      />
      <ProjectForm
        setDeleteDisplay={setDeleteDisplay}
        setEditDisplay={setEditDisplay}
        setProjectExpansionDisplay={setProjectExpansionDisplay}
        project={project}
        projectName={projectName}
        projectDescriptionDisplay={projectDescriptionDisplay}
        projectExpansionDisplay={projectExpansionDisplay}
        deleteDisplay={deleteDisplay}
        editDisplay={editDisplay}
        accountName={accountName}
      />

      <ArrayTasks
        unfinishedTasksRender={unfinishedTasksRender}
        finishedTasksRender={finishedTasksRender}
        projectName={projectName}
        taskListDisplay={taskListDisplay}
      />
    </li>
  );
}

export default Project;
