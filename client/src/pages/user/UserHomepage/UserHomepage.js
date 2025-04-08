import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { profileNameSlice } from "../../../redux/databaseSlice.js";
import HomepageBody from "./HomapageBody/HomepageBody.js";
import HomepageForm from "./HomepageForms/HomepageForms.js";
import HomepageUtils from "./HomepageUtils/HomepageUtils.js";

import styles from "./UserHomepage.module.css";

function UserHomepage(props) {
  const profileName = useSelector((state) => state[profileNameSlice.name]);

  return (
    <>
      <Helmet>
        <title>Homepage | ToDo List</title>
      </Helmet>
      <div className={styles.rootContainer}>
        <div>
          <p>To-do List Application / {profileName}</p>
          <h2>Homepage</h2>
        </div>
        <HomepageUtils />
        <HomepageForm />
        <HomepageBody />
      </div>
    </>
  );
}

export default UserHomepage;
