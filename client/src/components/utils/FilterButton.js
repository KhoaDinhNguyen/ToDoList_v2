import { useDispatch } from "react-redux";
import { filterAndSortFormSlice } from "../../redux/utilsSlice";

import filterButton from "../../asset/img/filterButton.png";
import "../../styles/components/FilterButton.css";

function FilterButton() {
  const dispatch = useDispatch();

  const onClickFilter = () => {
    dispatch(filterAndSortFormSlice.actions.toggle());
  };

  return (
    <>
      <button id="filterButton" onClick={onClickFilter}>
        <img src={filterButton} alt="Filter" title="Filter" />
      </button>
    </>
  );
}

export default FilterButton;
