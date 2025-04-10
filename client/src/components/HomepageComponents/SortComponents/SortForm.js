import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  sortTaskNameSlice,
  sortTimeCreatedSlice,
  sortTimeDeadlineSlice,
} from "../../../redux/utilsSlice";

import SortTaskName from "./SortTaskName/SortTaskName";
import SortTaskTimeCreated from "./SortTaskTimeCreated/SortTaskTimeCreated";
import SortTaskTimeDeadline from "./SortTaskTimeDeadline/SortTaskTimeDeadline";

import styles from "./SortForm.module.css";

function SortForm() {
  const [timeCreatedASC, setTimeCreatedASC] = useState(false);
  const [timeCreatedDESC, setTimeCreatedDESC] = useState(false);
  const [taskNameASC, setTaskNameASC] = useState(false);
  const [taskNameDESC, setTaskNameDESC] = useState(false);
  const [timeDeadlineASC, setTimeDeadlineASC] = useState(true);
  const [timeDeadlineDESC, setTimeDeadlineDESC] = useState(false);
  const dispatch = useDispatch();

  const onChangeTimeCreatedASC = () => {
    if (timeCreatedASC) {
      setTimeCreatedASC(false);
    } else {
      setTimeCreatedASC(true);
      setTimeCreatedDESC(false);
    }
  };

  const onChangeTimeCreatedDESC = () => {
    if (timeCreatedDESC) {
      setTimeCreatedDESC(false);
    } else {
      setTimeCreatedDESC(true);
      setTimeCreatedASC(false);
    }
  };

  const onChangeTaskNameASC = () => {
    if (taskNameASC) {
      setTaskNameASC(false);
    } else {
      setTaskNameASC(true);
      setTaskNameDESC(false);
    }
  };
  const onChangeTaskNameDESC = () => {
    if (taskNameDESC) {
      setTaskNameDESC(false);
    } else {
      setTaskNameDESC(true);
      setTaskNameASC(false);
    }
  };

  const onChangeTimeDeadlineASC = () => {
    if (timeDeadlineASC) {
      setTimeDeadlineASC(false);
    } else {
      setTimeDeadlineASC(true);
      setTimeDeadlineDESC(false);
    }
  };

  const onChangeTimeDeadlineDESC = () => {
    if (timeDeadlineDESC) {
      setTimeDeadlineDESC(false);
    } else {
      setTimeDeadlineDESC(true);
      setTimeDeadlineASC(false);
    }
  };

  useEffect(() => {
    const sort = {
      sortTimeCreated: null,
      sortTaskName: null,
      sortTimeDeadline: null,
    };
    if (taskNameASC) sort.sortTaskName = true;
    else if (taskNameDESC) sort.sortTaskName = false;

    if (timeCreatedASC) sort.sortTimeCreated = true;
    else if (timeCreatedDESC) sort.sortTimeCreated = false;

    if (timeDeadlineASC) sort.sortTimeDeadline = true;
    else if (timeDeadlineDESC) sort.sortTimeDeadline = false;

    dispatch(sortTaskNameSlice.actions.apply(sort.sortTaskName));
    dispatch(sortTimeCreatedSlice.actions.apply(sort.sortTimeCreated));
    dispatch(sortTimeDeadlineSlice.actions.apply(sort.sortTimeDeadline));
  }, [
    taskNameASC,
    taskNameDESC,
    timeCreatedASC,
    timeCreatedDESC,
    timeDeadlineASC,
    timeDeadlineDESC,
    dispatch,
  ]);

  const onClickResetSort = () => {
    setTaskNameASC(false);
    setTaskNameDESC(false);
    setTimeCreatedASC(false);
    setTimeCreatedDESC(false);
    setTimeDeadlineASC(true);
    setTimeDeadlineDESC(false);
  };
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>Sort</h3>
      <SortTaskName
        taskNameASC={taskNameASC}
        taskNameDESC={taskNameDESC}
        onChangeTaskNameASC={onChangeTaskNameASC}
        onChangeTaskNameDESC={onChangeTaskNameDESC}
      />
      <SortTaskTimeCreated
        timeCreatedASC={timeCreatedASC}
        timeCreatedDESC={timeCreatedDESC}
        onChangeTimeCreatedASC={onChangeTimeCreatedASC}
        onChangeTimeCreatedDESC={onChangeTimeCreatedDESC}
      />
      <SortTaskTimeDeadline
        timeDeadlineASC={timeDeadlineASC}
        timeDeadlineDESC={timeDeadlineDESC}
        onChangeTimeDeadlineASC={onChangeTimeDeadlineASC}
        onChangeTimeDeadlineDESC={onChangeTimeDeadlineDESC}
      />
      <button className={styles.clearButton} onClick={onClickResetSort}>
        Clear sort
      </button>
    </div>
  );
}

export default SortForm;
