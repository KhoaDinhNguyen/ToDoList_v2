import { useState } from "react";

import TaskDisplaysCalendar from "./TaskDisplaysCalendar/TaskDisplaysCalendar";
import CalendarTable from "./CalendarTable/CalendarTable";

import styles from "./Calendar.module.css";

function Calendar(props) {
  const { tasks } = props;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const [calendarMonth, setCalendarMonth] = useState(month);
  const [calendarYear, setCalendarYear] = useState(year);
  const [calendarDate, setCalendarDate] = useState("");
  const [currentView, setCurrentView] = useState("month");

  return (
    <div className={styles.rootContainer}>
      <div>
        <TaskDisplaysCalendar
          date={calendarDate}
          month={calendarMonth}
          year={calendarYear}
          tasks={tasks}
          currentView={currentView}
        />
      </div>
      <div>
        <CalendarTable
          tasks={tasks}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          setCalendarDate={setCalendarDate}
          setCalendarMonth={setCalendarMonth}
          setCalendarYear={setCalendarYear}
          setCurrentView={setCurrentView}
        />
      </div>
    </div>
  );
}

export default Calendar;
