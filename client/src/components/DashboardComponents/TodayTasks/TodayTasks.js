import TaskDisplay from "../../TaskComponents/TaskDisplay";

import styles from "./TodayTasks.module.css";

function TodayTask(props) {
  const { todayTask } = props;

  const todayTaskList = [];

  for (const task of todayTask) {
    const { projectName, taskName } = task;
    todayTaskList.push(
      <TaskDisplay
        key={`${projectName}${taskName}`}
        task={task}
        type="dashboard"
        today={true}
      />
    );
  }

  return (
    <div className={styles.rootContainer}>
      <h2>Today</h2>
      {todayTask.length === 0 && <p>Nothing need to do</p>}
      {todayTask.length !== 0 && <ul>{todayTaskList}</ul>}
    </div>
  );
}

export default TodayTask;
