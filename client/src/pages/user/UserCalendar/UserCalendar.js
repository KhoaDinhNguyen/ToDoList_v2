import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import Calendar from "../../../components/CalendarComponents/Calendar";
import { tasksSlice } from "../../../redux/databaseSlice";
import { profileNameSlice } from "../../../redux/databaseSlice";

function UserCalendar() {
  const tasks = useSelector((state) => state[tasksSlice.name]);
  const profileName = useSelector((state) => state[profileNameSlice.name]);
  return (
    <>
      <Helmet>
        <title>Calendar | ToDo List</title>
      </Helmet>
      <div>
        <p>To-do List Application / {profileName}</p>
        <h2>Calendar</h2>
      </div>
      <Calendar tasks={tasks} />
    </>
  );
}

export default UserCalendar;
