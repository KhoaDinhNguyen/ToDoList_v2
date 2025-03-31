import { useDispatch } from "react-redux";

import { createProjectFormSlice } from "../../../redux/utilsSlice";

import styles from "./CreateProjectButton.module.css";

function CreateProjectButton() {
  const dispatch = useDispatch();
  const onClickOpenForm = () => {
    dispatch(createProjectFormSlice.actions.setState(true));
  };

  return (
    <button onClick={onClickOpenForm} className={styles.rootContainer}>
      <span className={styles.title}>&#x271A; Create project</span>
    </button>
  );
}

export default CreateProjectButton;
