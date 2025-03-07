import { useState } from "react";

import { fetchUserUpdate } from "../../API/userAPI";

import hideEyeIcon from "../../asset/img/hide.png";
import showEyeIcon from "../../asset/img/show.png";

import "../../styles/components/Password.css";

function Password() {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
  const [revealPassword, setRevealPassword] = useState("password");
  const accountName = localStorage.getItem("accountName");

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const onChangeNewConfirmedPassword = (event) => {
    setNewConfirmedPassword(event.target.value);
  };

  const onClickRevealPassword = () => {
    if (revealPassword === "password") setRevealPassword("text");
    else setRevealPassword("password");
  };

  const onSubmitChangePasswordForm = (event) => {
    event.preventDefault();
    if (newPassword !== newConfirmedPassword) {
      alert("Confirmed password is not the same");
    } else {
      fetchUserUpdate(accountName, "password", null, newPassword)
        .then((response) => {
          alert(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="userProfilePassword">
      <form onSubmit={onSubmitChangePasswordForm} id="userProfilePasswordForm">
        <fieldset>
          <legend>Password</legend>
          <div className="userProfileInput">
            <label htmlFor="changePassword">
              New password<span style={{ color: "red" }}>&#42;</span>
            </label>
            <input
              type={revealPassword}
              name="changePassword"
              id="changePassword"
              value={newPassword}
              onChange={onChangeNewPassword}
              autoComplete="off"
              required
            />
          </div>
          <div className="userProfileInput">
            <label htmlFor="changeConfirmedPassword">
              Confirmed password<span style={{ color: "red" }}>&#42;</span>
            </label>
            <input
              type={revealPassword}
              name="changeConfirmedPassword"
              id="changeConfirmedPassword"
              value={newConfirmedPassword}
              onChange={onChangeNewConfirmedPassword}
              autoComplete="off"
              required
            />
          </div>
          <div id="userProfileButton">
            <img
              id="eyeImg"
              src={revealPassword === "password" ? hideEyeIcon : showEyeIcon}
              alt={
                revealPassword === "password" ? "hidePassword" : "showPassword"
              }
              onClick={onClickRevealPassword}
            />
            <input type="submit" value="Apply" />
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Password;
