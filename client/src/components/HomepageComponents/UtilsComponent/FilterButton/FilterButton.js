import { useDispatch } from "react-redux";
import { filterAndSortFormSlice } from "../../../../redux/utilsSlice";

import filterButton from "../../../../asset/img/filterButton.png";
import { FilterSVG } from "../../../utils/SVG";

import styles from "./FilterButton.module.css";

function FilterButton() {
  const dispatch = useDispatch();

  const onClickFilter = () => {
    dispatch(filterAndSortFormSlice.actions.toggle());
  };

  return (
    <button className={styles.rootContainer} onClick={onClickFilter}>
      <FilterSVG />
    </button>
  );
}

export default FilterButton;
