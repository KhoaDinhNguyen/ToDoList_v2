import { useState } from "react";

import folder from "../../../asset/img/folder.png";

import styles from "./ArrayTasks.module.css";

function UnfinishedTask(props) {
  const { unfinishedTasksRender } = props;
  const [listVisible, setListVisible] = useState(true);

  const onClickFinishedListTaskVisible = () => {
    setListVisible(!listVisible);
  };

  if (unfinishedTasksRender.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>Active</p>
        <div className={styles.buttonContainer}>
          <div className={styles.numTaskContainer}>
            <p className={styles.numText}>{unfinishedTasksRender.length}</p>
          </div>
          <img
            src={folder}
            alt="Open"
            onClick={onClickFinishedListTaskVisible}
          />
        </div>
      </div>
      <ul className={listVisible ? styles.arrayVisible : styles.arrayHidden}>
        {unfinishedTasksRender}
      </ul>
    </>
  );
}

export default UnfinishedTask;
