import TaskDisplay from "../../TaskComponents/TaskDisplay";
import { sortTask } from "../../../utils/sortTask";

import styles from "./UpcommingTasks.module.css";

function UpcomingTask(props) {
  const { upcommingTask } = props;

  const upcommingTaskList = [];
  const upcommingTaskSort = sortTask(upcommingTask, {
    sortTimeCreated: undefined,
    sortTaskName: undefined,
    sortTimeDeadline: true,
  });

  for (const task of upcommingTaskSort) {
    const { projectName, taskName } = task;
    upcommingTaskList.push(
      <TaskDisplay
        key={`${projectName}${taskName}`}
        task={task}
        type="dashboard"
        today={false}
      />
    );
  }

  return (
    <div className={styles.rootContainer}>
      <h2>Upcomming task</h2>
      {upcommingTask.length === 0 && <p>Nothing need to do</p>}
      {upcommingTask.length !== 0 && <ul>{upcommingTaskList}</ul>}
    </div>
  );
}

export default UpcomingTask;
