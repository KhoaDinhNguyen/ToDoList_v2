import { Helmet } from "react-helmet";

import HomepageHeader from "../../homepage/HomepageHeader/HomepageHeader";
import HomepageFooter from "../../homepage/HomepageFooter/HomepageFooter";

import errorImg from "../../../asset/img/errors.png";

import styles from "./PageNotFound.module.css";

function CredentialPage() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <HomepageHeader />
      <main className={styles.rootContainer}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <img src={errorImg} alt="404" className={styles.image} />
            <h1 className={styles.title}>404! Page not found.</h1>
          </div>
          <p className={styles.text}>Cannot find the page have same address</p>
        </div>
      </main>
      <HomepageFooter />
    </>
  );
}

export default CredentialPage;
