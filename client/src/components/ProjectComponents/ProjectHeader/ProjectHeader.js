import ProjectProgress from "../ProjectProgress/ProjectProgess";

import deleteLogo from "../../../asset/img/deleteDisplay.png";
import editLogo from "../../../asset/img/editDisplay.png";
import infoLogo from "../../../asset/img/informationDisplay.png";
import arrowLink from "../../../asset/img/arrowLink.png";

import styles from "./ProjectHeader.module.css";

function ProjectHeader({
  numOfPendingTask,
  numOfFulfilledTask,
  numOfFailingTask,
  onClickEditDisplay,
  onClickDeleteDisplay,
  onClickTaskListDisplay,
  onClickProjectDescriptionDisplay,
  projectName,
}) {
  return (
    <div className={styles.rootContainer}>
      <ProjectProgress
        numOfPendingTask={numOfPendingTask}
        numOfFulfilledTask={numOfFulfilledTask}
        numOfFailingTask={numOfFailingTask}
      />
      <h3 className={styles.title}>{projectName}</h3>
      <div className={styles.buttonsContainer}>
        <img
          src={infoLogo}
          alt="Info"
          onClick={onClickProjectDescriptionDisplay}
          className={styles.buttonContainer}
        />
        <img
          src={editLogo}
          alt="Edit"
          onClick={onClickEditDisplay}
          className={styles.buttonContainer}
        />
        <img
          src={deleteLogo}
          alt="Edit"
          onClick={onClickDeleteDisplay}
          className={styles.buttonContainer}
        />
        <img
          src={arrowLink}
          alt="Close"
          onClick={onClickTaskListDisplay}
          className={styles.buttonContainer}
        />
      </div>
    </div>
  );
}

export default ProjectHeader;
