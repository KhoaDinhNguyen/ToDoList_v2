import { Helmet } from "react-helmet";

import HomepageHeader from "../../homepage/HomepageHeader/HomepageHeader";
import HomepageFooter from "../../homepage/HomepageFooter/HomepageFooter";

import errorImg from "../../../asset/img/404-error.png";

import styles from "./CredentialPage.module.css";

function CredentialPage() {
  return (
    <>
      <Helmet>
        <title>Bad credentials</title>
      </Helmet>
      <HomepageHeader />
      <main className={styles.rootContainer}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <img src={errorImg} alt="401" className={styles.image} />
            <h1 className={styles.title}>401! Bad credentials.</h1>
          </div>
          <p className={styles.text}>
            Your session might be expired, or you try to access other accounts
            without log in.
          </p>
        </div>
      </main>
      <HomepageFooter />
    </>
  );
}

export default CredentialPage;
