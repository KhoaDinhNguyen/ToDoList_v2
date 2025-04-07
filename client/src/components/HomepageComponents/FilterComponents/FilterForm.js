import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { FilterStatusForm } from "./FilterStatus/FilterStatusForm";
import FilterDate from "./FliterDate/FilterDate";
import FilterStar from "./FilterStar/FilterStar";

import filterButton from "../../../asset/img/filterButton.png";

import styles from "./FilterForm.module.css";

import {
  filterStatusSlice,
  filterImportantSlice,
  filterTimeCreatedFromSlice,
  filterTimeCreatedToSlice,
  filterTimeDeadlineFromSlice,
  filterTimeDeadlineToSlice,
  filterAndSortFormSlice,
} from "../../../redux/utilsSlice";

//import "../../styles/components/FilterForm.css";

function FilterForm() {
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState([
    "pending",
    "fulfilled",
    "failing",
  ]);
  const [importantFilter, setImporantFilter] = useState(false);

  const [dateFilter, setDateFilter] = useState({
    timeCreatedFrom: "",
    timeCreatedTo: "",
    timeDeadlineFrom: "",
    timeDeadlineTo: "",
  });

  useEffect(() => {
    const { timeCreatedFrom, timeCreatedTo, timeDeadlineFrom, timeDeadlineTo } =
      dateFilter;

    dispatch(filterStatusSlice.actions.apply(statusFilter));
    dispatch(filterImportantSlice.actions.apply(importantFilter));
    dispatch(filterTimeCreatedFromSlice.actions.apply(timeCreatedFrom));
    dispatch(filterTimeCreatedToSlice.actions.apply(timeCreatedTo));
    dispatch(filterTimeDeadlineFromSlice.actions.apply(timeDeadlineFrom));
    dispatch(filterTimeDeadlineToSlice.actions.apply(timeDeadlineTo));
  }, [statusFilter, dateFilter, dispatch, importantFilter]);

  const onChangeStar = () => {
    setImporantFilter(!importantFilter);
  };

  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>Filter</h3>
      <FilterStar
        id={"star"}
        onChangeImportantFilter={onChangeStar}
        importantFilter={importantFilter}
      />
      <FilterStatusForm setStatusFilter={setStatusFilter} />
      <FilterDate setDateFilter={setDateFilter} />
    </div>
  );
}

export default FilterForm;
