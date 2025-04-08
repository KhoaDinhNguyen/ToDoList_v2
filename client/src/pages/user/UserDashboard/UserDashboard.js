import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { profileNameSlice } from "../../../redux/databaseSlice";
import { tasksSlice } from "../../../redux/databaseSlice";
import Dashboard from "../../../components/DashboardComponents/Dashboard";
import { splitTask } from "../../../utils/finishTask";

function UserDashboard() {
  const tasks = useSelector((state) => state[tasksSlice.name]);
  const profileName = useSelector((state) => state[profileNameSlice.name]);
  const [finishedTask, unfinishedTask] = splitTask(tasks);

  return (
    <>
      <Helmet>
        <title>Dashboard | ToDo List</title>
      </Helmet>
      <div>
        <p>To-do List Application / {profileName}</p>
        <h2>Dashboard</h2>
      </div>
      <Dashboard finishedTask={finishedTask} unfinishedTask={unfinishedTask} />
    </>
  );
}

export default UserDashboard;
