import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import LoadingModal from "../LoadingModal/LoadingModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import FailModal from "../FailModal/FailModal";

import { fetchUserUpdate } from "../../../API/userAPI";
import { profileNameSlice } from "../../../redux/databaseSlice";

import styles from "./ProfileName.module.css";
import InputText from "../../utils/InputText/InputText";

function ProfileName() {
  const params = useParams();

  const profileName = useSelector((state) => state[profileNameSlice.name]);
  const accountName = params.username;
  const [newProfileName, setNewProfileName] = useState(profileName);
  const [formVisble, setFormVisble] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onChangeNewProfileName = (event) => {
    setNewProfileName(event.target.value);
  };

  const onClickEditHandler = () => {
    setFormVisble(true);
  };

  const onChangeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const onSubmitChangeProfileForm = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("Update profile in process");
    try {
      fetchUserUpdate(accountName, "profileName", newProfileName, null).then(
        (response) => {
          setLoading(false);
          if (!response.error) {
            onChangeMessage("Update profile successfullly");
            dispatch(profileNameSlice.actions.assignName(newProfileName));
          }
        }
      );

      setFormVisble(false);
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <div className={styles.rootContanier}>
        <div className={styles.infoContainer}>
          <div>
            <h4 className={styles.title}>Profile name: </h4>
            <p>A name displayed on website</p>
          </div>
          {formVisble && (
            <InputText
              id="profileNameEdit"
              required={true}
              valueText={newProfileName}
              onChangeText={onChangeNewProfileName}
              inputStyle={styles.profileInput}
            />
          )}
          {!formVisble && (
            <p className={styles.info}>
              {formVisble ? newProfileName : profileName}
            </p>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          {formVisble && (
            <button
              onClick={onSubmitChangeProfileForm}
              className={styles.submitButton}
            >
              <p>Save changes</p>
            </button>
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
        error={"Cannot update profile"}
        message={message}
      />
    </>
  );
}

export default ProfileName;
