import styles from "./Modal.module.css";

function Modal({ children, visible }) {
  return (
    <div
      className={styles.rootContainer}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

export default Modal;
