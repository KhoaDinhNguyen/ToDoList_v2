import TaskDisplaysDaily from "./TaskDisplaysDaily";
import TaskDisplaysMonthly from "./TaskDisplaysMonthly";

import styles from "./TaskDisplaysCalendar.module.css";

function TaskDisplaysCalendar(props) {
  const { month, year, date, tasks, currentView } = props;

  return (
    <div className={styles.rootContainer}>
      {currentView === "month" && (
        <TaskDisplaysMonthly month={month} year={year} tasks={tasks} />
      )}
      {currentView !== "month" && (
        <TaskDisplaysDaily
          date={date}
          month={month}
          year={year}
          tasks={tasks}
        />
      )}
    </div>
  );
}

export default TaskDisplaysCalendar;
