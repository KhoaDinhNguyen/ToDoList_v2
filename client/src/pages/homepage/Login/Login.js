import { Helmet } from "react-helmet";

import LoginForm from "./LoginForm/LoginForm";
import LoginHeader from "./LoginHeader/LoginHeader";

import styles from "./Login.module.css";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login | ToDo List</title>
      </Helmet>
      <div className={styles.rootContainer}>
        <LoginHeader />
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
