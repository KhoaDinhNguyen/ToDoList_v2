import TaskDisplay from "../../TaskComponents/TaskDisplay";
import { getMonthName } from "../../../utils/getMonthName";

import styles from "./TaskDisplaysCalendar.module.css";

function TaskDisplaysMonthly(props) {
  const { month, year, tasks } = props;

  const arrayOfTask = tasks.filter((task) => {
    const taskTimeDeadline = task.taskTimeDeadline.slice(0, 10);
    const yearTimeDeadline = Number.parseInt(taskTimeDeadline.slice(0, 4));
    const monthTimeDeadline = Number.parseInt(taskTimeDeadline.slice(5, 7));
    return month === monthTimeDeadline && year === yearTimeDeadline;
  });

  const listTaskRender = [];

  if (arrayOfTask.length !== 0) {
    for (const task of arrayOfTask) {
      listTaskRender.push(
        <TaskDisplay
          key={`${task.taskName}_${task.projectName}_display`}
          date={task.taskTimeDeadline}
          task={task}
          type="calendar"
        />
      );
    }
  }

  return (
    <div>
      <p className={styles.title}>
        {getMonthName(month)} {year}
      </p>
      <ul className={styles.listTasks}>{listTaskRender}</ul>
    </div>
  );
}

export default TaskDisplaysMonthly;
