import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import Calendar from "../../components/task/Calendar";
import { tasksSlice } from "../../redux/databaseSlice";

function UserCalendar() {
  const tasks = useSelector((state) => state[tasksSlice.name]);

  return (
    <>
      <Helmet>
        <title>Calendar | ToDo List</title>
      </Helmet>
      <Calendar tasks={tasks} />
    </>
  );
}

export default UserCalendar;
