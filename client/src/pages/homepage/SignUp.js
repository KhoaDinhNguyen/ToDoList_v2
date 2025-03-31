import { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";

import { fetchSignUp } from "../../API/pageAPI";
import signUpLogo from "../../asset/img/signupPage.png";
import InputText from "../../components/utils/InputText/InputText";
import PasswordInput from "../../components/utils/PasswordInput";

import "../../styles/pages/SignUp.css";
import styles from "../../styles/pages/SignUp.module.css";

function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign Up | ToDo List</title>
      </Helmet>
      <div id="signUp">
        <SignUpIntro />
        <SignUpMain />
      </div>
    </>
  );
}

function SignUpIntro() {
  return (
    <div id="signUpIntro">
      <h2>Discover the Future of Scheduling</h2>
      <p>
        Unlock your potential with MasterTask, the ultimate tool for
        productivity. Begin your journey now with a hassle-free sign-up!
      </p>
    </div>
  );
}

function SignUpMain() {
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
      setMessage("The confirm password is different.");
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      fetchSignUp(accountName, profileName, password)
        .then((response) => {
          setLoading(false);
          setMessage(response.message);

          if (!response.error) {
            setAccountName("");
            setProfileName("");
            setPassword("");
            setConfirmedPassword("");
          } else {
            setTimeout(() => {
              setMessage("");
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="signUpMain">
      <div id="signUpContextHeader">
        <img src={signUpLogo} alt="SignUp logo" />
        <h2>Create an account</h2>
        <p>
          Already have an account?{" "}
          <NavLink to="/homepage/login">Sign in</NavLink>
        </p>
      </div>
      <form onSubmit={onSubmitSignIn} id="signUpForm">
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
        <PasswordInput
          id="profileNameSignUp"
          value={password}
          onChangePassword={onChangePassword}
          placeholder="Password name"
          style={styles.signUpInput}
        />
        <PasswordInput
          id="confirmedPasswordSignUp"
          value={password}
          onChangePassword={onChangeConfirmedPassword}
          placeholder="Confirmed password"
          style={styles.signUpInput}
        />
        <input
          type="submit"
          value="Sign Up"
          id="signUpSubmit"
          name="signUpSubmit"
        />
        <label htmlFor="signUpSubmit" id="signUpSubmitLabel">
          Sign Up
        </label>
      </form>
      <div
        id="message"
        style={{ visibility: message === "" ? "hidden" : "visible" }}
      >
        <SignUpState loading={loading} message={message} />
      </div>
      <SignUpDialog message={message} setMessage={setMessage} />
    </div>
  );
}
function SignUpState(props) {
  const { loading, message } = props;

  if (
    loading === false &&
    message === "Sign up successfully. Return to login to sign in"
  )
    return <p>{message}</p>;
  if (loading === false)
    return <p style={{ color: "red" }}>&#9432; {message}</p>;
  return <p>...Authenticating</p>;
}

function SignUpDialog(props) {
  const { message, setMessage } = props;
  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("/homepage/login");
  };

  const onClickStayOnThePage = () => {
    setMessage("");
  };

  return (
    <div
      id="dialog"
      className={`${
        message === "Sign up successfully. Return to login to sign in"
          ? "visibleDialog"
          : "notVisibleDialog"
      }`}
    >
      <div
        id="signUpDialogMain"
        className={`${
          message === "Sign up successfully. Return to login to sign in"
            ? "visibleSignUpDialog"
            : "notVisibleSignUpDialog"
        }`}
      >
        <p id="symbol" className="successSymbol">
          <span>&#10003;</span>
        </p>
        <p>{message}</p>
        <div id="button">
          <button onClick={onClickGoToLogin}>Go to login</button>
          <button onClick={onClickStayOnThePage}>Stay on the page</button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
