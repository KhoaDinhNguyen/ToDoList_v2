import styles from "./Statistic.module.css";

function Statistic(props) {
  const {
    totalNumTask,
    numFinishedTask,
    numUnfinishedTask,
    numPendingTask,
    numFailingTask,
    numFulfilledTask,
  } = props;

  return (
    <div className={styles.rootContainer}>
      <div className={styles.totalNumTask}>
        <h3>Total task:</h3>
        <p>{totalNumTask}</p>
      </div>
      <div className={styles.numUnfinishedTask}>
        <h3># Unfinished</h3>
        <p>{numUnfinishedTask}</p>
      </div>
      <div className={styles.numFinishedTask}>
        <h3># Finished</h3>
        <p>{numFinishedTask}</p>
      </div>
      <div className={styles.numPendingTask}>
        <h3># Pending</h3>
        <p>{numPendingTask}</p>
      </div>
      <div className={styles.numFulfilledTask}>
        <h3># Fulfilled</h3>
        <p>{numFulfilledTask}</p>
      </div>
      <div className={styles.numFailingTask}>
        <h3># Failing</h3>
        <p>{numFailingTask}</p>
      </div>
    </div>
  );
}

export default Statistic;
