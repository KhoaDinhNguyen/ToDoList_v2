import loginImg from "../../../../asset/img/login.png";

import styles from "./LoginHeader.module.css";

function LoginHeader() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          Elevate Your Task Management Effortlessly
        </h2>
        <p className={styles.text}>
          Log in to continue the seamless journey with our intuitive app. Safe,
          secure, and always at your service.
        </p>
        <img src={loginImg} alt="Login logo" className={styles.image} />
      </div>
    </div>
  );
}

export default LoginHeader;
