import { useDispatch, useSelector } from "react-redux";

import InputText from "../../../utils/InputText/InputText";
import { searchSlice } from "../../../../redux/utilsSlice";

import styles from "./SearchForm.module.css";

function SearchForm() {
  const seachString = useSelector((state) => state[searchSlice.name]);
  const dispatch = useDispatch();

  const onChangeSearchString = (event) => {
    dispatch(searchSlice.actions.apply(event.target.value));
  };
  return (
    <InputText
      id="searchString"
      valueText={seachString}
      onChangeText={onChangeSearchString}
      placeholder="&#x1F50E; Search tasks"
      containerStyle={styles.rootContainer}
      inputStyle={styles.inputContainer}
    />
  );
}

export default SearchForm;
