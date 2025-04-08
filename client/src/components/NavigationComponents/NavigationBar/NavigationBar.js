import { NavLink } from "react-router-dom";
import LogOut from "../LogOut/LogOut";
import {
  HomepageSVG,
  DashboardSVG,
  CalendarSVG,
  ProfileSVG,
} from "../../utils/SVG";

import logoPage from "../../../asset/img/logoPage.png";

import styles from "./NavigationBar.module.css";

function NavigationBar({ navigationBarDisplay }) {
  const linkIsActive = ({ isActive }) => {
    return isActive ? styles.matchPage : "";
  };

  return (
    <div
      className={`${styles.rootContainer} ${
        navigationBarDisplay ? styles.visibleBar : styles.hiddenBar
      }`}
    >
      <div className={styles.barContainer}>
        <div className={styles.barHeader}>
          <div className={styles.logoContainer}>
            <img src={logoPage} alt="logoPage" className={styles.logoImage} />
          </div>
        </div>
        <nav className={styles.pageNavigation}>
          <ul className={styles.buttonsContainer}>
            <li className={styles.buttonContainer}>
              <NavLink to="homepage" className={linkIsActive}>
                <HomepageSVG />
              </NavLink>
            </li>
            <li className={styles.buttonContainer}>
              <NavLink to="dashboard" className={linkIsActive}>
                <DashboardSVG />
              </NavLink>
            </li>
            <li className={styles.buttonContainer}>
              <NavLink to="calendar" className={linkIsActive}>
                <CalendarSVG />
              </NavLink>
            </li>
            <li className={styles.buttonContainer}>
              <NavLink to="profile" className={linkIsActive}>
                <ProfileSVG />
              </NavLink>
            </li>
          </ul>
        </nav>
        <LogOut />
      </div>
    </div>
  );
}

export default NavigationBar;
