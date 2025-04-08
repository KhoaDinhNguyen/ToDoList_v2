import ImportantStar from "../../utils/ImportantStar/ImportantStar";
import InfoText from "../../utils/InfoText/InfoText";
import FulfilledBox from "../../utils/FulfilledBox/FulfilledBox";

import styles from "./TaskDisplayDashboard.module.css";

function TaskDisplayDashboard(props) {
  const {
    task,
    onChangeTaskStatus,
    onClickImportant,
    onChangeTaskDetailDisplay,
    currentImportant,
    currentStatus,
    taskDetailDisplay,
    today,
  } = props;
  const { taskName, projectName, taskTimeDeadline } = task;

  return (
    <li>
      <div className={styles.taskContainer}>
        <div className={styles.taskFunctionContainer}>
          <FulfilledBox
            id={`${projectName}_${taskName}Fulfilled`}
            onChangeTaskStatus={onChangeTaskStatus}
            currentStatus={currentStatus}
          />
          <ImportantStar
            id={`${projectName}_${taskName}_important`}
            currentImportant={currentImportant}
            onClickImportant={onClickImportant}
          />
        </div>
        <div
          className={styles.taskNameAndTaskDeadline}
          onClick={onChangeTaskDetailDisplay}
        >
          <div className={styles.taskName}>
            <p>{taskName}</p>
          </div>
          <div>
            {today && <p></p>}
            {!today && <p>{taskTimeDeadline}</p>}
          </div>
        </div>
      </div>
      <TaskInfoDashboard task={task} taskDetailDisplay={taskDetailDisplay} />
    </li>
  );
}

function TaskInfoDashboard(props) {
  const { task, taskDetailDisplay } = props;
  const {
    taskTimeDeadline,
    taskTimeCreated,
    taskDescription,
    projectName,
    taskName,
    taskStatus,
  } = task;

  return (
    <div
      className={`${styles.taskInfoContainer} ${
        taskDetailDisplay ? styles.taskInfoVisible : styles.taskInfoHidden
      }`}
    >
      <InfoText title="Task name">
        <p>{taskName}</p>
      </InfoText>
      <InfoText title="Task description">
        <p>{taskDescription}</p>
      </InfoText>
      <InfoText title="Task status">
        <TaskStatus taskStatus={taskStatus} />
      </InfoText>
      <InfoText title="Deadline">
        <p>{taskTimeDeadline.slice(0, 10)}</p>
      </InfoText>
      <InfoText title="Time created">{taskTimeCreated}</InfoText>
      <InfoText title="Project name">{projectName}</InfoText>
    </div>
  );
}

function TaskStatus({ taskStatus }) {
  return (
    <div className={styles.taskStatus}>
      <p>
        {taskStatus.substring(0, 1).toUpperCase() + taskStatus.substring(1)}
      </p>
      <div className={`${taskStatus} ${styles.statusBox}`}></div>
    </div>
  );
}
export default TaskDisplayDashboard;
