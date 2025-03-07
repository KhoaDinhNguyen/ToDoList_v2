import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { FilterDateForm } from "./FilterDateForm";
import { FilterStatusForm } from "./FilterStatusForm";

import {
  filterStatusSlice,
  filterImportantSlice,
  filterTimeCreatedFromSlice,
  filterTimeCreatedToSlice,
  filterTimeDeadlineFromSlice,
  filterTimeDeadlineToSlice,
} from "../../redux/utilsSlice";

import "../../styles/components/FilterForm.css";

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
    <div id="filterForm">
      <h3>Filter</h3>
      <h4>Star</h4>
      <div id="starFilter">
        <input
          type="checkbox"
          id="star"
          name="star"
          checked={importantFilter}
          onChange={onChangeStar}
        />
        <label htmlFor="star">
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        </label>
      </div>
      <FilterStatusForm setStatusFilter={setStatusFilter} />
      <FilterDateForm setDateFilter={setDateFilter} />
    </div>
  );
}

export default FilterForm;
