import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Profile from "../../../components/ProfileComponents/Profile";
import { profileNameSlice } from "../../../redux/databaseSlice";

function UserProfile() {
  const profileName = useSelector((state) => state[profileNameSlice.name]);

  return (
    <>
      <Helmet>
        <title>Profile | ToDo List</title>
      </Helmet>
      <div>
        <p>To-do List Application / {profileName}</p>
        <h2>Profile</h2>
      </div>
      <Profile />
    </>
  );
}

export default UserProfile;
