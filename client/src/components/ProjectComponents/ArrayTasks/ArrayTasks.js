import FinishedTask from "./FinishedTask";
import UnfinishedTask from "./UnfinishedTask";
import CreateTaskForm from "../../TaskComponents/CreateTaskForm/CreateTaskForm";

import styles from "./ArrayTasks.module.css";

function ArrayTasks({
  unfinishedTasksRender,
  finishedTasksRender,
  projectName,
  taskListDisplay,
}) {
  return (
    <div
      className={`${
        taskListDisplay ? styles.allTasksVisible : styles.allTasksHidden
      } ${styles.rootContainer}`}
    >
      <div>
        <UnfinishedTask unfinishedTasksRender={unfinishedTasksRender} />
        <FinishedTask finishedTasksRender={finishedTasksRender} />
        <CreateTaskForm projectName={projectName} />
      </div>
    </div>
  );
}

export default ArrayTasks;
