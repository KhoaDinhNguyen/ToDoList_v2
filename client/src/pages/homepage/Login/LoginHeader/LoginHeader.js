import loginImg from "../../../../asset/img/login.png";

import styles from "./LoginHeader.module.css";

function LoginHeader() {
  return (
    <div className={styles.rootContainer}>
      <div id="loginIntroContext">
        <h2>Elevate Your Task Management Effortlessly</h2>
        <p>
          Log in to continue the seamless journey with our intuitive app. Safe,
          secure, and always at your service.
        </p>
        <img src={loginImg} alt="Login logo" />
      </div>
    </div>
  );
}

export default LoginHeader;
