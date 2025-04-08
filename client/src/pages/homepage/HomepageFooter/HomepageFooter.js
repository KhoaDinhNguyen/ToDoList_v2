import logoPage from "../../../asset/img/logoPage.png";

import styles from "./HomepageFooter.module.css";

function HomepageFooter() {
  return (
    <footer className={styles.rootContainer}>
      <div className={styles.companyName}>
        <img
          src={logoPage}
          alt="Company logo"
          title="MasterTask"
          className={styles.companyImage}
        />
        <p className={styles.companyName}>MasterTask</p>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.message}>
          <p>
            Stay organized and achieve more with MasterTask. Put your
            productivity on autopilot.
          </p>
        </div>
        <div className={styles.contact}>
          <p>khoacode1305@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default HomepageFooter;
