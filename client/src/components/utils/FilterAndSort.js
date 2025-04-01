import { useSelector } from "react-redux";

import FilterForm from "./FilterForm";
import SortForm from "../HomepageComponents/SortComponents/SortForm";

import { filterAndSortFormSlice } from "../../redux/utilsSlice";
import { convertFromBooleanToDisplay } from "../../pages/user/User";

import "../../styles/components/FilterAndSort.css";

function FilterAndSortForm() {
  const filterAndSortDisplay = useSelector(
    (state) => state[filterAndSortFormSlice.name]
  );

  return (
    <div style={{ display: convertFromBooleanToDisplay(filterAndSortDisplay) }}>
      <div id="filterAndSortForm">
        <FilterForm />
        <SortForm />
      </div>
    </div>
  );
}

export default FilterAndSortForm;
