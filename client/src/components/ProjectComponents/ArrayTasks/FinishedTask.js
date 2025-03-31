import { useState } from "react";

import folder from "../../../asset/img/folder.png";

import styles from "./ArrayTasks.module.css";

function FinishedTask(props) {
  const { finishedTasksRender } = props;
  const [finishedListTaskVisible, setFinishedListTaskVisible] = useState(false);

  const onClickFinishedListTaskVisible = () => {
    setFinishedListTaskVisible(!finishedListTaskVisible);
  };

  if (finishedTasksRender.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>Finished</p>
        <div className={styles.buttonContainer}>
          <div className={styles.numTaskContainer}>
            <p className={styles.numText}>{finishedTasksRender.length}</p>
          </div>
          <img
            src={folder}
            alt="Open"
            onClick={onClickFinishedListTaskVisible}
          />
        </div>
      </div>
      <ul
        className={
          finishedListTaskVisible ? styles.arrayVisble : styles.arrayHidden
        }
      >
        {finishedTasksRender}
      </ul>
    </>
  );
}

export default FinishedTask;
