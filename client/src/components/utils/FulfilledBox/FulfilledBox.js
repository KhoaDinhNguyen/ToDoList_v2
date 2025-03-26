import styles from "./FulfilledBox.module.css";

function FulfilledBox({ id, onChangeTaskStatus, currentStatus }) {
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        className={styles.checkboxInput}
        onChange={onChangeTaskStatus}
        checked={currentStatus === "pending" ? false : true}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
        </svg>
      </label>
    </>
  );
}

export default FulfilledBox;
