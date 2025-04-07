import Modal from "../../../../components/utils/Modal/Modal";
import { Success2SVG } from "../../../../components/utils/SVG";
import styles from "./SuccessModal.module.css";

function SuccessModal({ visible }) {
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div
        className={`${styles.contentContainer} ${
          visible ? styles.visibleModal : styles.hiddenModal
        }`}
      >
        <Success2SVG />
        <p className={styles.title}>
          Login succeed. Navigating to userpage in seconds
        </p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
