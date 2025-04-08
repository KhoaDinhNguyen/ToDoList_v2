import { Helmet } from "react-helmet";

import AboutUsIntro from "./AboutUsIntro/AboutUsIntro";
import AboutUsFeatures from "./AboutUsFeatures/AboutUsFeatures";

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | ToDo List</title>
      </Helmet>
      <div id="aboutUs">
        <AboutUsIntro />
        <AboutUsFeatures />
      </div>
    </>
  );
}
export default AboutUs;
