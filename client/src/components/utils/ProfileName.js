import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUserUpdate } from "../../API/userAPI";
import { profileNameSlice } from "../../redux/databaseSlice";
import "../../styles/components/ProfileName.css";

function ProfileName() {
  const profileName = useSelector((state) => state[profileNameSlice.name]);
  const [newProfileName, setNewProfileName] = useState("");
  const accountName = localStorage.getItem("accountName");
  const dispatch = useDispatch();

  const onChangeNewProfileName = (event) => {
    setNewProfileName(event.target.value);
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
  };
  return (
    <>
      <form onSubmit={onSubmitChangeProfileForm} id="profileNameForm">
        <fieldset>
          <legend>Profile name</legend>
          <p>Profile name: {profileName}</p>
          <div className="userProfileInput">
            <label htmlFor="newProfileName">New profile name:</label>
            <input
              type="text"
              id="newProfileName"
              name="newProfileName"
              value={newProfileName}
              onChange={onChangeNewProfileName}
            />
          </div>
          <div id="profileNameButton">
            <input type="submit" value="Apply" />
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default ProfileName;
