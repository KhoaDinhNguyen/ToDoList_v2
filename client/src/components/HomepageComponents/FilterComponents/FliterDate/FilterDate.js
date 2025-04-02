import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import InputDate from "../../../utils/InputDate/InputDate";

import styles from "./FilterDate.module.css";

function FilterDate({ setDateFilter }) {
  const [timeCreatedFrom, setTimeCreatedFrom] = useState("");
  const [timeCreatedTo, setTimeCreatedTo] = useState("");
  const [timeDeadlineFrom, setTimeDeadlineFrom] = useState("");
  const [timeDeadlineTo, setTimeDeadlineTo] = useState("");
  const dispatch = useDispatch();

  const onChangeSetTimeCreatedFrom = (event) => {
    setTimeCreatedFrom(event.target.value);
  };
  const onChangeSetTimeCreatedTo = (event) => {
    setTimeCreatedTo(event.target.value);
  };
  const onChangeSetTimeDeadlineFrom = (event) => {
    setTimeDeadlineFrom(event.target.value);
  };
  const onChangeSetTimeDeadlineTo = (event) => {
    setTimeDeadlineTo(event.target.value);
  };

  useEffect(() => {
    const dateFilter = {
      timeCreatedFrom,
      timeCreatedTo,
      timeDeadlineFrom,
      timeDeadlineTo,
    };

    setDateFilter(dateFilter);
  }, [
    timeCreatedFrom,
    timeCreatedTo,
    timeDeadlineFrom,
    timeDeadlineTo,
    dispatch,
    setDateFilter,
  ]);

  const onClickClearDate = () => {
    setTimeCreatedFrom("");
    setTimeCreatedTo("");
    setTimeDeadlineFrom("");
    setTimeDeadlineTo("");
  };

  return (
    <div>
      <div>
        <h4>Task time created</h4>
        <InputDate
          id={"filterCreatedTimeBegin"}
          valueText={timeCreatedFrom}
          onChangeText={onChangeSetTimeCreatedFrom}
          labelText={"From"}
          labelStyle={styles.label}
        />
        <InputDate
          id={"filterCreatedTimeEnd"}
          valueText={timeCreatedTo}
          onChangeText={onChangeSetTimeCreatedTo}
          min={timeCreatedFrom}
          labelStyle={styles.label}
          labelText={"To"}
        />
      </div>
      <div>
        <h4>Task time deadline</h4>
        <InputDate
          id={"filterDeadlineTimeBegin"}
          valueText={timeDeadlineFrom}
          onChangeText={onChangeSetTimeDeadlineFrom}
          min={timeCreatedFrom}
          labelStyle={styles.label}
          labelText={"From"}
        />
        <InputDate
          id={"filterDeadlineTimeEnd"}
          valueText={timeDeadlineTo}
          onChangeText={onChangeSetTimeDeadlineTo}
          min={timeDeadlineFrom}
          labelStyle={styles.label}
          labelText={"To"}
        />
      </div>
      <button className={styles.clearButton} onClick={onClickClearDate}>
        Clear date
      </button>
    </div>
  );
}

export default FilterDate;
