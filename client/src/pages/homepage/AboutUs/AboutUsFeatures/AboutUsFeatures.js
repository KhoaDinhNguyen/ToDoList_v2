import AboutUsFeature from "../AboutUsFeature/AboutUsFeature";

import calendarImg from "../../../../asset/img/calendar.png";
import dashboardImg from "../../../../asset/img/dashboard.png";
import homepageImg from "../../../../asset/img/homepage.png";

import styles from "./AboutUsFeatures.module.css";

function AboutUsFeatures() {
  return (
    <div className={styles.rootContainer}>
      <h3 className={styles.title}>FEATURES</h3>
      <h2 className={styles.message}>Features to Satisfy Your Demands</h2>
      <p className={styles.text}>
        Unleash the power of productivity with cutting-edge features.
      </p>
      <div className={styles.featuresContainer}>
        <AboutUsFeature
          id={styles.homepage}
          image={homepageImg}
          title={"Homepage"}
          message={"A place where users can create, update, delete tasks."}
        />
        <AboutUsFeature
          id={styles.dashboard}
          image={dashboardImg}
          title={"Dashboard"}
          message={
            "Tasks are organized by deadline supporting users to see upcoming deadline."
          }
        />
        <AboutUsFeature
          id={styles.calendar}
          image={calendarImg}
          title={"Calendar"}
          message={
            "Users can see tasks in calendar mode providing an overall view."
          }
        />
      </div>
    </div>
  );
}

export default AboutUsFeatures;
