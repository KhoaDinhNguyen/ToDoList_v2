import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { convertDateToISOString } from "../../utils/helperFunctions";
import { fetchTaskUpdate } from "../../API/taskAPI";
import { tasksSlice } from "../../redux/databaseSlice";
import TaskDisplayCalendar from "./TaskDisplayCalendar/TaskDisplayCalendar";
import TaskDisplayDashboard from "./TaskDisplayDashboard/TaskDisplayDashboard";
import TaskDisplayHomepage from "./TaskDisplayHomepage/TaskDisplayHomepage";
import { userSlice } from "../../redux/userSlice";
//import "../../styles/components/taskDisplay.css";

function TaskDisplay(props) {
  const { type, task } = props;
  const { taskStatus, projectName, taskName, taskImportant, taskTimeDeadline } =
    task;
  const [currentStatus, setCurrentStatus] = useState(taskStatus);
  const [taskDetailDisplay, setTaskDetailDisplay] = useState(false);
  const [currentImportant, setCurrentImportant] = useState(taskImportant);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [taskDescriptionDisplay, setTaskDescriptionDisplay] = useState(false);
  const accountName = useSelector((state) => state[userSlice.name]);
  const dispatch = useDispatch();

  const today = new Date();
  const todayString = convertDateToISOString(today);

  const onChangeTaskStatus = (event) => {
    const newStatus = nextStatus(taskStatus);
    setCurrentStatus(newStatus);
    const task = { taskName, projectName, accountName, currentImportant };
    fetchTaskUpdate(task, newStatus)
      .then((response) => {
        dispatch(
          tasksSlice.actions.changeStatus({ taskName, projectName, newStatus })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTaskDetailDisplay = () => {
    setEditDisplay(false);
    setDeleteDisplay(false);
    setTaskDetailDisplay(!taskDetailDisplay);
  };

  const onClickInfo = () => {
    if (taskDetailDisplay === true && taskDescriptionDisplay === true) {
      setTaskDescriptionDisplay(false);
      setTaskDetailDisplay(false);
      return;
    } else if (taskDetailDisplay === false) {
      setTaskDetailDisplay(true);
    }
    setTaskDescriptionDisplay(true);
    setEditDisplay(false);
    setDeleteDisplay(false);
  };
  const onClickEdit = () => {
    if (taskDetailDisplay === true && editDisplay === true) {
      setEditDisplay(false);
      setTaskDetailDisplay(false);
      return;
    } else if (taskDetailDisplay === false) {
      setTaskDetailDisplay(true);
    }
    setEditDisplay(true);
    setTaskDescriptionDisplay(false);
    setDeleteDisplay(false);
  };

  const onClickDelete = () => {
    if (taskDetailDisplay === true && deleteDisplay === true) {
      setDeleteDisplay(false);
      setTaskDetailDisplay(false);
      return;
    } else if (taskDetailDisplay === false) {
      setTaskDetailDisplay(true);
    }
    setDeleteDisplay(true);
    setTaskDescriptionDisplay(false);
    setEditDisplay(false);
  };

  const onClickImportant = (event) => {
    const newImportantStatus = !currentImportant;
    const task = { taskName, projectName, accountName, newImportantStatus };
    setCurrentImportant(newImportantStatus);
    fetchTaskUpdate(task, "important")
      .then((response) => {
        dispatch(
          tasksSlice.actions.changeImportant({
            taskName,
            projectName,
            newImportantStatus,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (type === "calendar") {
    return (
      <TaskDisplayCalendar
        task={props.task}
        onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
        currentStatus={currentStatus}
        taskDetailDisplay={taskDetailDisplay}
        currentImportant={currentImportant}
        onClickImportant={onClickImportant}
      />
    );
  } else if (type === "dashboard") {
    return (
      <TaskDisplayDashboard
        task={props.task}
        onChangeTaskStatus={onChangeTaskStatus}
        onClickImportant={onClickImportant}
        onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
        currentImportant={currentImportant}
        currentStatus={currentStatus}
        taskDetailDisplay={taskDetailDisplay}
        finish={taskTimeDeadline < todayString}
        today={props.today}
      />
    );
  }

  return (
    <TaskDisplayHomepage
      task={props.task}
      onChangeTaskStatus={onChangeTaskStatus}
      onClickImportant={onClickImportant}
      onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
      setDeleteDisplay={setDeleteDisplay}
      setEditDisplay={setEditDisplay}
      currentImportant={currentImportant}
      currentStatus={currentStatus}
      finish={taskTimeDeadline < todayString}
      deleteDisplay={deleteDisplay}
      editDisplay={editDisplay}
      taskDescriptionDisplay={taskDescriptionDisplay}
      onClickInfo={onClickInfo}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      setTaskDetailDisplay={setTaskDetailDisplay}
    />
  );
}

function nextStatus(currentStatus) {
  if (currentStatus === "pending") return "fulfilled";
  else return "pending";
}

export default TaskDisplay;
