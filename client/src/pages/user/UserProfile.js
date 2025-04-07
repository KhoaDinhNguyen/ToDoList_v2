import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import ProfileName from "../../components/utils/ProfileName";
import Password from "../../components/utils/Password";

import "../../styles/pages/UserProfile.css";

import Profile from "../../components/ProfileComponents/Profile";

function UserProfile() {
  const accountName = useSelector((state) => state[userSlice.name]);

  return (
    <>
      <Helmet>
        <title>Profile | ToDo List</title>
      </Helmet>
      {/* <div id="userProfile">
        <fieldset id="userProfileBody">
          <legend id="userProfileHeader">Profile</legend>
          <fieldset id="accountName">
            <legend>Account name</legend>
            <p>Account name: {accountName}</p>
          </fieldset>
          <ProfileName />
          <Password />
        </fieldset>
      </div> */}
      <Profile />
    </>
  );
}

export default UserProfile;
