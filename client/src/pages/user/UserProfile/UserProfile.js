import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { userSlice } from "../../../redux/userSlice";

import Profile from "../../../components/ProfileComponents/Profile";

function UserProfile() {
  const accountName = useSelector((state) => state[userSlice.name]);

  return (
    <>
      <Helmet>
        <title>Profile | ToDo List</title>
      </Helmet>
      <Profile />
    </>
  );
}

export default UserProfile;
