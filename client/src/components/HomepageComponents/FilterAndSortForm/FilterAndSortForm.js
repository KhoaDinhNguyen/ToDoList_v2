import { useSelector } from "react-redux";

import FilterForm from "../FilterComponents/FilterForm";
import SortForm from "../SortComponents/SortForm";

import { filterAndSortFormSlice } from "../../../redux/utilsSlice";
import { convertFromBooleanToDisplay } from "../../../utils/helperFunctions";

import styles from "./FilterAndSortForm.module.css";

function FilterAndSortForm() {
  const filterAndSortDisplay = useSelector(
    (state) => state[filterAndSortFormSlice.name]
  );

  return (
    <div style={{ display: convertFromBooleanToDisplay(filterAndSortDisplay) }}>
      <div className={styles.rootContainer}>
        <FilterForm />
        <SortForm />
      </div>
    </div>
  );
}

export default FilterAndSortForm;
