import { Helmet } from "react-helmet";

import ProfileName from "../../components/utils/ProfileName";
import Password from "../../components/utils/Password";

import "../../styles/pages/UserProfile.css";

function UserProfile() {
  const accountName = localStorage.getItem("accountName");

  return (
    <>
      <Helmet>
        <title>Profile | ToDo List</title>
      </Helmet>
      <div id="userProfile">
        <fieldset id="userProfileBody">
          <legend id="userProfileHeader">Profile</legend>
          <fieldset id="accountName">
            <legend>Account name</legend>
            <p>Account name: {accountName}</p>
          </fieldset>
          <ProfileName />
          <Password />
        </fieldset>
      </div>
    </>
  );
}

export default UserProfile;
