import logoPage from "../../../asset/img/logoPage.png";

import styles from "./UserFooter.module.css";

function UserFooter() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.companyLogo}>
        <img
          src={logoPage}
          alt="Company logo"
          title="MasterTask"
          className={styles.companyImage}
        />
        <p className={styles.companyName}>MasterTask</p>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.messageContainer}>
          <p>
            Stay organized and achieve more with MasterTask. Put your
            productivity on autopilot.
          </p>
        </div>
        <div className={styles.contactInfo}>
          <p>khoacode1305@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default UserFooter;
