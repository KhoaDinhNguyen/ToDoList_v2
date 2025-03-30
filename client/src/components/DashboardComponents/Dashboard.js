import TodayTask from "./TodayTasks/TodayTasks";
import UpcomingTask from "./UpcommingTasks/UpcommingTasks";
import Statistic from "./Statistic/Statistic";
import DashboardChart from "./Chart/DashboardChart";
import { convertDateToISOString } from "../../pages/user/User";

import styles from "./Dashboard.module.css";

function Dashboard(props) {
  const { finishedTask, unfinishedTask } = props;

  const today = new Date();
  const todayString = convertDateToISOString(today);

  const todayTask = unfinishedTask.filter(
    (task) => task.taskTimeDeadline === todayString
  );
  const upcommingTask = unfinishedTask.filter(
    (task) => task.taskTimeDeadline > todayString
  );

  const numFinishedTask = finishedTask.length;
  const numUnfinishedTask = unfinishedTask.length;
  const totalNumTask = numUnfinishedTask + numFinishedTask;
  const numPendingTask = unfinishedTask.filter(
    (task) => task.taskStatus === "pending"
  ).length;
  const numFailingTask = finishedTask.filter(
    (task) => task.taskStatus === "failing"
  ).length;
  const numFulfilledTask = totalNumTask - numFailingTask - numPendingTask;

  return (
    <>
      <div className="pageActive">
        <p>To-do List Application</p>
        <h2>Dashboard</h2>
      </div>
      <div className={styles.rootContainer}>
        <TodayTask todayTask={todayTask} />
        <UpcomingTask upcommingTask={upcommingTask} />
        <Statistic
          totalNumTask={totalNumTask}
          numFinishedTask={numFinishedTask}
          numUnfinishedTask={numUnfinishedTask}
          numPendingTask={numPendingTask}
          numFailingTask={numFailingTask}
          numFulfilledTask={numFulfilledTask}
        />
        <DashboardChart
          totalNumTask={totalNumTask}
          numFinishedTask={numFinishedTask}
          numUnfinishedTask={numUnfinishedTask}
          numPendingTask={numPendingTask}
          numFailingTask={numFailingTask}
          numFulfilledTask={numFulfilledTask}
        />
      </div>
    </>
  );
}

export default Dashboard;
