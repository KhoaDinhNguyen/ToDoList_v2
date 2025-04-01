import InputCheckBox from "../../../utils/InputCheckbox/InputCheckbox";

import styles from "./SortTaskName.module.css";

function SortTaskName({
  taskNameASC,
  taskNameDESC,
  onChangeTaskNameASC,
  onChangeTaskNameDESC,
}) {
  return (
    <div className={styles.rootContainer}>
      <h4 className={styles.title}>Task name</h4>
      <div className={styles.checkBoxesContainer}>
        <InputCheckBox
          id={"sortTaskNameASC"}
          checked={taskNameASC}
          onChangeHandler={onChangeTaskNameASC}
          containerStyle={styles.checkBoxContainer}
          labelText={"ASC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
        <InputCheckBox
          id={"sortTaskNameDESC"}
          checked={taskNameDESC}
          onChangeHandler={onChangeTaskNameDESC}
          containerStyle={styles.checkBoxContainer}
          labelText={"DESC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
      </div>
    </div>
  );
}

export default SortTaskName;
