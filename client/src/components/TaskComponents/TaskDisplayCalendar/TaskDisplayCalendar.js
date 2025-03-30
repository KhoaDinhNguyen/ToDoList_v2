import ImportantStar from "../../utils/ImportantStar/ImportantStar";
import styles from "./TaskDisplayCalendar.module.css";

function TaskDisplayCalendar({
  task,
  currentStatus,
  currentImportant,
  onClickImportant,
}) {
  const { taskName, projectName } = task;

  return (
    <li className={styles.rootContainer}>
      <div className={styles.taskNameContainer}>
        <ImportantStar
          id={`${taskName}_important`}
          currentImportant={currentImportant}
          onClickImportant={onClickImportant}
        />
        <p>{taskName}</p>
        <p>-- Project name: {projectName}</p>
      </div>
      <div className={styles.statusContainer}>
        <div className={`${styles[currentStatus]} ${styles.statusBlock}`}>
          <p>{currentStatus.substr(0, 1).toUpperCase()}</p>
        </div>
      </div>
    </li>
  );
}

export default TaskDisplayCalendar;
