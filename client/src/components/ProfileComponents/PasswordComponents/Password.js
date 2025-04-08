import { useState } from "react";
import { useSelector } from "react-redux";

import { fetchUserUpdate } from "../../../API/userAPI";
import { userSlice } from "../../../redux/userSlice";

import { EyeSVG } from "../../utils/SVG";
import { EyeSlashSVG } from "../../utils/SVG";
import styles from "./Password.module.css";

function Password() {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [formVisble, setFormVisble] = useState(false);

  const accountName = useSelector((state) => state[userSlice.name]);

  const onClickEditHandler = () => {
    setFormVisble(true);
  };
  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const onChangeNewConfirmedPassword = (event) => {
    setNewConfirmedPassword(event.target.value);
  };

  const onClickRevealPassword = () => {
    if (typePassword === "password") setTypePassword("text");
    else setTypePassword("password");
  };

  const onSubmitChangePasswordForm = (event) => {
    event.preventDefault();
    if (newPassword !== newConfirmedPassword) {
      alert("Confirmed password is not the same");
    } else {
      fetchUserUpdate(accountName, "password", null, newPassword)
        .then((response) => {
          alert(response.message);
          setFormVisble(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.infoContainer}>
        <div>
          <h4 className={styles.title}>Password: </h4>
          <p>Protect your logging</p>
        </div>
        {formVisble && (
          <div className={styles.inputsContainer}>
            <input
              type={typePassword}
              id="editPassword"
              name="editPassword"
              value={newPassword}
              onChange={onChangeNewPassword}
              required={true}
              className={styles.profileInput}
              placeholder="Password"
            />
            <input
              type={typePassword}
              id="editConfirmedPassword"
              name="editConfirmedPassword"
              value={newConfirmedPassword}
              onChange={onChangeNewConfirmedPassword}
              required={true}
              className={styles.profileInput}
              placeholder="Confirmed Password"
            />
          </div>
        )}
        {!formVisble && (
          <p className={styles.info}>
            (This is not the password) The password cannot read. Edit only
          </p>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        {formVisble && (
          <>
            <div
              onClick={onClickRevealPassword}
              className={styles.revealPassword}
            >
              {typePassword === "password" ? <EyeSlashSVG /> : <EyeSVG />}
            </div>
            <button
              className={styles.submitButton}
              onClick={onSubmitChangePasswordForm}
            >
              <p>Save changes</p>
            </button>
          </>
        )}
        {!formVisble && (
          <button onClick={onClickEditHandler} className={styles.editButton}>
            <p>Edit</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Password;
