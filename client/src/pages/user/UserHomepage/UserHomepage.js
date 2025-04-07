import { Helmet } from "react-helmet";

import HomepageBody from "./HomapageBody/HomepageBody.js";
import HomepageForm from "./HomepageForms/HomepageForms.js";
import HomepageUtils from "./HomepageUtils/HomepageUtils.js";

import "./UserHomepage.css";

function UserHomepage(props) {
  return (
    <>
      <Helmet>
        <title>Homepage | ToDo List</title>
      </Helmet>
      <div id="userHomepage">
        <div className="pageActive">
          <p>To-do List Application</p>
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
