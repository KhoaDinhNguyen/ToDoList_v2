import { useNavigate } from "react-router-dom";

import Modal from "../../../../components/utils/Modal/Modal";
import { ErrorSVG, SuccesSVG } from "../../../../components/utils/SVG";

import styles from "./ResultModal.module.css";

function ResultModal({ message, setMessage, success }) {
  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("/homepage/login");
    setMessage("");
  };

  const onClickStayOnThePage = () => {
    setMessage("");
  };

  return (
    <Modal visible={message !== ""}>
      <div className={styles.contentContainer}>
        {success ? (
          <SuccessModal
            onClickGoToLogin={onClickGoToLogin}
            onClickStayOnThePage={onClickStayOnThePage}
          />
        ) : (
          <ErrorModal
            onClickStayOnThePage={onClickStayOnThePage}
            message={message}
          />
        )}
      </div>
    </Modal>
  );
}

function ErrorModal({ onClickStayOnThePage, message }) {
  return (
    <>
      <ErrorSVG />
      <p className={styles.title}>Oh no! Something is wrong</p>
      <p>{message}</p>
      <div className={styles.buttonsContainer}>
        <button
          onClick={onClickStayOnThePage}
          className={styles.buttonContainer}
        >
          <p> Sign up again</p>
        </button>
      </div>
    </>
  );
}

function SuccessModal({ onClickStayOnThePage, onClickGoToLogin }) {
  return (
    <>
      <SuccesSVG />
      <p className={styles.title}>
        Sign up successfully. Return to login to sign in
      </p>
      <div className={styles.buttonsContainer}>
        <button onClick={onClickGoToLogin} className={styles.buttonContainer}>
          <p>Go to login</p>
        </button>
      </div>
    </>
  );
}
export default ResultModal;
