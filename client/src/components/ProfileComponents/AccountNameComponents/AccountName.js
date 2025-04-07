import { useSelector } from "react-redux";

import { userSlice } from "../../../redux/userSlice";

import styles from "./AccountName.module.css";

function AccountName() {
  const username = useSelector((state) => state[userSlice.name]);

  return (
    <div className={styles.rootContainer}>
      <div>
        <h4 className={styles.title}>Account name: </h4>
        <p>A unique name used for logging</p>
      </div>
      <p className={styles.info}>{username}</p>
    </div>
  );
}

export default AccountName;
