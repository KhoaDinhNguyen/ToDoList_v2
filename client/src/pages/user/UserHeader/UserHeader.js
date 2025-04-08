import { NavigationButtonSVG } from "../../../components/utils/SVG";

import styles from "./UserHeader.module.css";

function UserHeader({ onClickHandler }) {
  return (
    <header className={styles.rootContainer}>
      <div className={styles.navigationButton} onClick={onClickHandler}>
        <NavigationButtonSVG />
      </div>
    </header>
  );
}

export default UserHeader;
