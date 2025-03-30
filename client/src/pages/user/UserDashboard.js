import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { tasksSlice } from "../../redux/databaseSlice";
import Dashboard from "../../components/DashboardComponents/Dashboard";
import { splitTask } from "../../utils/finishTask";

function UserDashboard() {
  const tasks = useSelector((state) => state[tasksSlice.name]);
  const [finishedTask, unfinishedTask] = splitTask(tasks);

  return (
    <>
      <Helmet>
        <title>Dashboard | ToDo List</title>
      </Helmet>
      <Dashboard finishedTask={finishedTask} unfinishedTask={unfinishedTask} />
    </>
  );
}

export default UserDashboard;
