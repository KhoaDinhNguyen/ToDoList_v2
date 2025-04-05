import Modal from "../../../components/utils/Modal/Modal";
import { Error2SVG } from "../../../components/utils/SVG";

import styles from "./FailModal.module.css";

function FailModal({ visible, message }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <Error2SVG />
        <p className={styles.title}>Failed to login. {message}</p>
      </div>
    </Modal>
  );
}

export default FailModal;
