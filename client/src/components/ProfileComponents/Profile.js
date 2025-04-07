import AccountName from "./AccountNameComponents/AccountName";
import ProfileName from "./ProfileNameComponents/ProfileName";
import Password from "./PasswordComponents/Password";

import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>General</h3>
      <AccountName />
      <ProfileName />
      <Password />
    </div>
  );
}

export default Profile;
