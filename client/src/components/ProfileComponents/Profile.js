import AccountName from "./AccountNameComponents/AccountName";
import ProfileName from "./ProfileNameComponents/ProfileName";

import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.rootContainer}>
      <AccountName />
      <ProfileName />
    </div>
  );
}

export default Profile;
