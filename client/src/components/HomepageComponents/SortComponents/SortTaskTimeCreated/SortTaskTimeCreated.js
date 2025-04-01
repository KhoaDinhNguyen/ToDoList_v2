import InputCheckBox from "../../../utils/InputCheckbox/InputCheckbox";

import styles from "./SortTaskTimeCreated.module.css";

function SortTaskTimeCreated({
  timeCreatedASC,
  onChangeTimeCreatedASC,
  timeCreatedDESC,
  onChangeTimeCreatedDESC,
}) {
  return (
    <div className={styles.rootContainer}>
      <h4 className={styles.title}>Task time created</h4>
      <div className={styles.checkBoxesContainer}>
        <InputCheckBox
          id={"sortTaskTimeCreatedASC"}
          checked={timeCreatedASC}
          onChangeHandler={onChangeTimeCreatedASC}
          containerStyle={styles.checkBoxContainer}
          labelText={"ASC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
        <InputCheckBox
          id={"sortTaskTimeCreatedDESC"}
          checked={timeCreatedDESC}
          onChangeHandler={onChangeTimeCreatedDESC}
          containerStyle={styles.checkBoxContainer}
          labelText={"DESC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
      </div>
    </div>
  );
}

export default SortTaskTimeCreated;
