import styles from "./InfoText.module.css";

function InfoText({ title, children }) {
  return (
    <div className={styles.rootContainer}>
      <p className={styles.title}>{title}: </p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default InfoText;
