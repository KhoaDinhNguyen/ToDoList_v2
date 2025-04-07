import { useDispatch } from "react-redux";
import { filterAndSortFormSlice } from "../../../../redux/utilsSlice";

import filterButton from "../../../../asset/img/filterButton.png";

import styles from "./FilterButton.module.css";

function FilterButton() {
  const dispatch = useDispatch();

  const onClickFilter = () => {
    dispatch(filterAndSortFormSlice.actions.toggle());
  };

  return (
    <button className={styles.rootContainer} onClick={onClickFilter}>
      <img
        src={filterButton}
        alt="Filter"
        title="Filter"
        className={styles.image}
      />
    </button>
  );
}

export default FilterButton;
