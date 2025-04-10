import { useState } from "react";
import { useSelector } from "react-redux";

import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const onChangeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const onSubmitChangePasswordForm = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("Update profile in process");
    if (newPassword !== newConfirmedPassword) {
      setLoading(false);
      onChangeMessage("Confirmed password is not the same");
    } else {
      fetchUserUpdate(accountName, "password", null, newPassword)
        .then((response) => {
          setLoading(false);
          onChangeMessage("Update profile successfullly");
          setFormVisble(false);
        })
        .catch((err) => {
          setLoading(false);
          onChangeMessage(err.message);
        });
    }
  };

  return (
    <>
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
      <LoadingModal visible={loading} message={message} />
      <SuccessModal
        visible={!loading && message === "Update profile successfullly"}
        message={message}
      />
      <FailModal
        visible={
          !loading &&
          message !== "" &&
          message !== "Update profile successfullly"
        }
        error={message}
        message={"Cannot update profile"}
      />
    </>
  );
}

export default Password;
