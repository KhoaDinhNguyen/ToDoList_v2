import { convertDateToISOString } from "../../../utils/helperFunctions";
import { getMonthNameShorthand } from "../../../utils/getMonthName";
import { Calendar2SVG, LeftArrow, RightArrow } from "../../utils/SVG";

import styles from "./CalendarTable.module.css";

function CalendarTable({
  tasks,
  calendarMonth,
  calendarYear,
  setCalendarDate,
  setCalendarMonth,
  setCalendarYear,
  setCurrentView,
}) {
  const today = new Date();
  const todayString = convertDateToISOString(today);

  const firstDayOfMonth = new Date(`${calendarYear} ${calendarMonth}`);
  const dateIterator = new Date(`${calendarYear} ${calendarMonth}`);
  const tableBody = [];

  let dayOfWeek = 0,
    nonDate = 0,
    numsOfRow = 0,
    row = [];

  while (dateIterator.getMonth() === firstDayOfMonth.getMonth()) {
    while (dayOfWeek !== dateIterator.getDay()) {
      row.push(<td key={`${nonDate++}_nonDate`} className={styles.date}></td>);
      dayOfWeek++;
    }

    const arrayOfTask = tasks.filter(
      (task) =>
        task.taskTimeDeadline.slice(0, 10) ===
        convertDateToISOString(dateIterator)
    );
    const currentDate = dateIterator.getDate();
    const currentDateString = convertDateToISOString(dateIterator);

    const onClickViewDateOnCalendar = () => {
      setCalendarDate(currentDate);
      setCurrentView("date");
    };

    const taskExist = arrayOfTask.length !== 0;
    row.push(
      <td
        key={currentDate}
        onClick={onClickViewDateOnCalendar}
        className={`${styles.date} ${taskExist ? styles.taskExist : ""} ${
          styles.dateExist
        }`}
      >
        <p
          className={`${
            currentDateString === todayString ? styles.today : ""
          } `}
        >
          {currentDate}
        </p>
      </td>
    );

    dayOfWeek++;
    dateIterator.setDate(dateIterator.getDate() + 1);

    if (dayOfWeek === 7) {
      dayOfWeek = 0;
      tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
      row = [];
    }
  }

  if (dayOfWeek !== 0) {
    while (dayOfWeek < 7) {
      row.push(<td key={`${nonDate++}_nonDate`} className={styles.date}></td>);
      dayOfWeek++;
    }
    tableBody.push(<tr key={`row_${numsOfRow++}`}>{row}</tr>);
    row = [];
  }

  const onClickNextMonth = () => {
    setCalendarDate("");
    setCurrentView("month");
    if (calendarMonth === 12) {
      setCalendarMonth(1);
      setCalendarYear((calendarYear) => calendarYear + 1);
    } else {
      setCalendarMonth((calendarMonth) => calendarMonth + 1);
    }
  };

  const onClickPreviousMonth = () => {
    setCalendarDate("");
    setCurrentView("month");
    if (calendarMonth === 1) {
      setCalendarMonth(12);
      setCalendarYear((calendarYear) => calendarYear - 1);
    } else {
      setCalendarMonth((calendarMonth) => calendarMonth - 1);
    }
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.headerContainer}>
        <p className={styles.calendarMonth}>
          {getMonthNameShorthand(calendarMonth)}, {calendarYear}
        </p>
        <div className={styles.buttonsContainer}>
          <div
            onClick={onClickPreviousMonth}
            className={styles.buttonContainer}
          >
            <LeftArrow />
          </div>
          <div
            onClick={() => {
              setCurrentView("month");
            }}
            title="Month View"
          >
            <Calendar2SVG />
          </div>
          <div onClick={onClickNextMonth} className={styles.buttonContainer}>
            <RightArrow />
          </div>
        </div>
      </div>
      <table className={styles.mainContainer}>
        <thead>
          <tr className={styles.weekDays}>
            <td key="Sun">SUN</td>
            <td key="Mon">MON</td>
            <td key="Tue">TUE</td>
            <td key="Wed">WED</td>
            <td key="Thu">THU</td>
            <td key="Fir">FRI</td>
            <td key="Sat">SAT</td>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}

export default CalendarTable;
