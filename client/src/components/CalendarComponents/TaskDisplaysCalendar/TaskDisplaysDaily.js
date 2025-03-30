import TaskDisplay from "../../TaskComponents/TaskDisplay";
import { convertDateToISOString } from "../../../pages/user/User";

import styles from "./TaskDisplaysCalendar.module.css";

function TaskDisplaysDaily(props) {
  const { date, month, year, tasks } = props;
  const currentDate = new Date(`${year} ${month} ${date}`);

  if (date === "") {
    return <></>;
  }

  const arrayOfTask = tasks.filter(
    (task) =>
      task.taskTimeDeadline.slice(0, 10) === convertDateToISOString(currentDate)
  );
  const listTaskRender = [];

  if (arrayOfTask.length !== 0) {
    for (const task of arrayOfTask) {
      listTaskRender.push(
        <TaskDisplay
          key={`${task.taskName}_${task.projectName}_display`}
          date={currentDate.toJSON()}
          task={task}
          type="calendar"
        />
      );
    }
  }

  return (
    <div>
      <p className={styles.title}>{currentDate.toDateString()}</p>
      <ul className={styles.listTasks}>{listTaskRender}</ul>
    </div>
  );
}

export default TaskDisplaysDaily;
