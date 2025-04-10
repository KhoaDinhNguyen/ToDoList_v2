import { useNavigate, NavLink } from "react-router-dom";
import logoPage from "../../../asset/img/logoPage.png";

import styles from "./HomepageHeader.module.css";

function HomepageHeader() {
  const navigate = useNavigate();
  const activeLink = ({ isActive }) =>
    isActive ? styles.active : styles.nonActive;

  return (
    <header className={styles.rootContainer}>
      <div className={styles.companyLogoContainer}>
        <img
          src={logoPage}
          alt="Company logo"
          onClick={() => {
            navigate("./aboutUs");
          }}
          title="MasterTask"
          className={styles.companyImage}
        />
        <p className={styles.companyName}>MasterTask</p>
      </div>
      <nav className={styles.navigationBar}>
        <ul className={styles.listOfPages}>
          <li className={styles.linkContainer}>
            <NavLink to="/homepage/aboutUs" className={activeLink}>
              About us
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to="/homepage/login" className={activeLink}>
              Log In
            </NavLink>
          </li>
          <li className={styles.linkContainer}>
            <NavLink to="/homepage/signUp" className={activeLink}>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HomepageHeader;
