import { useDispatch, useSelector } from "react-redux";

import { searchSlice } from "../../redux/utilsSlice";
import "../../styles/components/SearchForm.css";

function SearchForm() {
  const seachString = useSelector((state) => state[searchSlice.name]);
  const dispatch = useDispatch();

  const onChangeSearchString = (event) => {
    dispatch(searchSlice.actions.apply(event.target.value));
  };
  return (
    <div id="searchForm">
      <input
        type="text"
        id="searchString"
        name="searchString"
        value={seachString}
        onChange={onChangeSearchString}
        placeholder="&#x1F50E; Search tasks"
      />
    </div>
  );
}

export default SearchForm;
