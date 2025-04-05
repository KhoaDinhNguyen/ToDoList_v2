import { Helmet } from "react-helmet";

import SignUpHeader from "./SignUpHeader/SignUpHeader";
import SignUpForm from "./SignUpForm/SignUpForm";

import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign Up | ToDo List</title>
      </Helmet>
      <div className={styles.rootContainer}>
        <SignUpHeader />
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUp;
