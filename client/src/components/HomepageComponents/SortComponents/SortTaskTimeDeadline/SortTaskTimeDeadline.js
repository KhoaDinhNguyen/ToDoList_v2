import InputCheckBox from "../../../utils/InputCheckbox/InputCheckbox";

import styles from "./SortTaskTimeDeadline.module.css";

function SortTaskTimeDeadline({
  timeDeadlineASC,
  timeDeadlineDESC,
  onChangeTimeDeadlineASC,
  onChangeTimeDeadlineDESC,
}) {
  return (
    <div className={styles.rootContainer}>
      <h4 className={styles.title}>Task time deadline</h4>
      <div className={styles.checkBoxesContainer}>
        <InputCheckBox
          id={"sortTaskTimeDeadlineASC"}
          checked={timeDeadlineASC}
          onChangeHandler={onChangeTimeDeadlineASC}
          containerStyle={styles.checkBoxContainer}
          labelText={"ASC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
        <InputCheckBox
          id={"sortTaskTimeDeadlineDESC"}
          checked={timeDeadlineDESC}
          onChangeHandler={onChangeTimeDeadlineDESC}
          containerStyle={styles.checkBoxContainer}
          labelText={"DESC"}
          labelStyle={styles.checkBoxLabel}
          inputStyle={styles.checkBoxInput}
        />
      </div>
    </div>
  );
}

export default SortTaskTimeDeadline;
