import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";

import InputText from "../../../components/utils/InputText/InputText";
import PasswordInput from "../../../components/utils/PasswordInput";

import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import LoginHeader from "./LoginHeader/LoginHeader";
import FailModal from "./FailModal";
import { profileNameSlice } from "../../../redux/databaseSlice";
import { fetchSignIn } from "../../../API/pageAPI";
import profileLogo from "../../../asset/img/loginPage.png";
//import profileLogo from "../../img/homepage/loginPage.png";
import loginImg from "../../../asset/img/login.png";
import { cookies } from "../../../App";
import styles from "../../../styles/pages/Login.module.css";

import "../../../styles/pages/Login.css";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login | ToDo List</title>
      </Helmet>
      <div id="loginPage">
        <LoginHeader />
        <LoginMain />
      </div>
    </>
  );
}

// function LoginIntro() {
//   return (
//     <div id="loginIntro">
//       <div id="loginIntroContext">
//         <h2>Elevate Your Task Management Effortlessly</h2>
//         <p>
//           Log in to continue the seamless journey with our intuitive app. Safe,
//           secure, and always at your service.
//         </p>
//         <img src={loginImg} alt="Login logo" />
//       </div>
//     </div>
//   );
// }

function LoginMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [, setDisplayMessage] = useState("hidden");
  //const [cookie, setCookie] = useCookies(["jwt"]);

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
            //document.cookie = response.token;
            //console.log(document.cookie);
            cookies.set("jwt", response.token, {
              expires: Date.now() + process.env.JWT_COOKIE_EXPIRED_TIME * 1,
            });
            // setCookie("jwt", response.token, {
            //   expires: Date.now() + process.env.JWT_COOKIE_EXPIRED_TIME * 1,
            // });
            console.log(cookies.get("jwt"));
            //localStorage.setItem("accountName", response.name);
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
      <div id="loginMain">
        <div id="loginMainContext">
          <div id="loginContextHeader">
            <img src={profileLogo} alt="Profile logo" id="loginLogo" />
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in</p>
          </div>
          <form onSubmit={onSubmitLogin} id="loginForm">
            <InputText
              id="accountNameSignIn"
              required={true}
              value={accountName}
              onChangeText={onChangeAccountName}
              placeholder="Username"
              containerStyle={styles.loginInput}
            />
            <PasswordInput
              id="passwordSignIn"
              value={password}
              onChangePassword={onChangePassword}
              placeholder="Password"
              style={styles.loginInput}
            />
            <div id="forgetPassword">
              <NavLink to="/homepage/forgetPassword">Forgot password?</NavLink>
            </div>
            <input type="submit" id="loginSubmit" name="loginSubmit" />
            <label htmlFor="loginSubmit" id="labelLoginSubmit">
              <span>Sign In</span>
            </label>
          </form>
          <div id="loginContextFooter">
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

export default Login;
