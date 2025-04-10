import { useState } from "react";
import { NavLink } from "react-router-dom";

import { fetchSignUp } from "../../../../API/pageAPI";

import signUpLogo from "../../../../asset/img/signupPage.png";
import InputText from "../../../../components/utils/InputText/InputText";
import InputButton from "../../../../components/utils/InputButton/InputButton";
import InputPassword from "../../../../components/utils/InputPassword/InputPassword";
import ResultModal from "../ResultModal/ResultModal";
import LoadingModal from "../LoadingModal/LoadingModal";

import styles from "./SignUpForm.module.css";

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const onChangeAccountName = (event) => {
    setAccountName(event.target.value);
  };
  const onChangeProfileName = (event) => {
    setProfileName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const onSubmitSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmedPassword) {
      setMessage("The confirmed password is different.");
      setLoading(false);
    } else {
      fetchSignUp(accountName, profileName, password)
        .then((response) => {
          setLoading(false);
          setMessage(response.message);
          setAccountName("");
          setProfileName("");
          setPassword("");
          setConfirmedPassword("");
        })
        .catch((err) => {
          setLoading(false);
          setMessage(err.message);
        });
    }
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.headerContainer}>
          <img src={signUpLogo} alt="SignUp logo" className={styles.image} />
          <h2 className={styles.title}>Create an account</h2>
          <p className={styles.linkContainer}>
            Already have an account?
            <NavLink to="/homepage/login">Sign in</NavLink>
          </p>
        </div>
        <form id="signUpForm">
          <InputText
            id="accountNameSignUp"
            value={accountName}
            onChangeText={onChangeAccountName}
            required={true}
            placeholder="Username"
            containerStyle={styles.signUpInput}
          />
          <InputText
            id="profileNameSignUp"
            value={profileName}
            onChangeText={onChangeProfileName}
            required={true}
            placeholder="Profile name"
            containerStyle={styles.signUpInput}
          />
          <InputPassword
            id="passwordSignUp"
            valuePassword={password}
            onChangePassword={onChangePassword}
            placeholder="Password name"
            style={styles.signUpInput}
            containerStyle={styles.signUpInput}
          />
          <InputPassword
            id="confirmedPasswordSignUp"
            valuePassword={confirmedPassword}
            onChangePassword={onChangeConfirmedPassword}
            placeholder="Confirmed password"
            style={styles.signUpInput}
            containerStyle={styles.signUpInput}
          />
          <InputButton
            id="signUpSubmit"
            type="submit"
            valueText="Sign Up"
            labelText="Sign Up"
            onClickHandler={onSubmitSignIn}
            inputStyle={styles.submitInput}
            labelStyle={styles.submitLabel}
            containerStyle={styles.submitButton}
          />
        </form>
      </div>
      <LoadingModal loading={loading} />
      <ResultModal
        message={message}
        setMessage={setMessage}
        success={message === "Sign up successfully. Return to login to sign in"}
      />
    </>
  );
}

export default SignUpForm;
