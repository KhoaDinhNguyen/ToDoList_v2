import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchUserUpdate } from "../../../API/userAPI";
import { profileNameSlice } from "../../../redux/databaseSlice";
//import "../../styles/components/ProfileName.css";

import styles from "./ProfileName.module.css";
import InputText from "../../utils/InputText/InputText";

function ProfileName() {
  const params = useParams();

  const profileName = useSelector((state) => state[profileNameSlice.name]);
  const accountName = params.username;
  const [newProfileName, setNewProfileName] = useState(profileName);
  const [formVisble, setFormVisble] = useState(false);
  const dispatch = useDispatch();

  const onChangeNewProfileName = (event) => {
    setNewProfileName(event.target.value);
  };

  const onClickEditHandler = () => {
    setFormVisble(true);
  };

  const onSubmitChangeProfileForm = (event) => {
    event.preventDefault();
    fetchUserUpdate(accountName, "profileName", newProfileName, null).then(
      (response) => {
        alert(response.message);
        if (!response.error) {
          dispatch(profileNameSlice.actions.assignName(newProfileName));
        }
      }
    );
    setFormVisble(false);
  };
  return (
    // <>
    //   <form onSubmit={onSubmitChangeProfileForm} id="profileNameForm">
    //     <fieldset>
    //       <legend>Profile name</legend>
    //       <p>Profile name: {profileName}</p>
    //       <div className="userProfileInput">
    //         <label htmlFor="newProfileName">New profile name:</label>
    //         <input
    //           type="text"
    //           id="newProfileName"
    //           name="newProfileName"
    //           value={newProfileName}
    //           onChange={onChangeNewProfileName}
    //         />
    //       </div>
    //       <div id="profileNameButton">
    //         <input type="submit" value="Apply" />
    //       </div>
    //     </fieldset>
    //   </form>
    // </>
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
        <button onClick={onClickEditHandler}>Edit</button>
        <button onClick={onSubmitChangeProfileForm}>Save changes</button>
      </div>
    </div>
  );
}

export default ProfileName;
