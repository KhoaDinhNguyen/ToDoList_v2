import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import InputText from "../../../../components/utils/InputText/InputText";
import InputPassword from "../../../../components/utils/InputPassword/InputPassword";
import InputButton from "../../../../components/utils/InputButton/InputButton";
import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { fetchSignIn } from "../../../../API/pageAPI";
import { cookies } from "../../../../App";
import { profileNameSlice } from "../../../../redux/databaseSlice";

import profileLogo from "../../../../asset/img/loginPage.png";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [, setDisplayMessage] = useState("hidden");

  const onChangeAccountName = (event) => {
    setAccountName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      fetchSignIn(accountName, password)
        .then((response) => {
          setLoading(false);
          if (!response.error) {
            cookies.set("jwt", response.token, {
              expires: Date.now() + process.env.JWT_COOKIE_EXPIRED_TIME * 1,
            });

            dispatch(profileNameSlice.actions.assignName(response.full_name));
            setAccountName("");
            setPassword("");
            setMessage("Success");
            //navigate(`/user/${response.name}/homepage`);
            setTimeout(() => {
              navigate(`/user/${response.name}/homepage`);
            }, 1000);
          } else {
            setMessage(response.message);
            setDisplayMessage("visible");
            setTimeout(() => {
              setMessage("");
              setDisplayMessage("hidden");
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
  };

  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <img
              src={profileLogo}
              alt="Profile logo"
              id="loginLogo"
              className={styles.image}
            />
            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.text}>Please enter your details to sign in</p>
          </div>
          <form id="loginForm">
            <InputText
              id="accountNameSignIn"
              required={true}
              valueText={accountName}
              onChangeText={onChangeAccountName}
              placeholder="Username"
              containerStyle={styles.loginInputContainer}
              inputStyle={styles.loginInput}
            />
            <InputPassword
              id="passwordSignIn"
              required={true}
              valuePassword={password}
              onChangePassword={onChangePassword}
              placeholder="Password"
              containerStyle={styles.loginInputContainer}
              inputStyle={styles.loginInput}
            />
            <div className={styles.forgetPasswordContainer}>
              <NavLink to="/homepage/forgetPassword">Forgot password?</NavLink>
            </div>
            <InputButton
              type="submit"
              id="loginSubmit"
              labelText="Sign In"
              onClickHandler={onSubmitLogin}
              inputStyle={styles.submitInput}
              labelStyle={styles.submitLabel}
            />
          </form>
          <div className={styles.footerContainer}>
            <p>
              Don't have an account?
              <NavLink to="/homepage/signUp">Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
      <LoadingModal visible={loading === true} />
      {message === "Success" && <SuccessModal visible={true} />}
      {message !== "" && message !== "Success" && (
        <FailModal visible={true} message={message} />
      )}
    </>
  );
}

export default LoginForm;
