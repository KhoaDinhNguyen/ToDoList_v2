import { Helmet } from "react-helmet";

import ProjectList from "../../components/ProjectComponents/Project.js";
import CreateProjectForm from "../../components/ProjectComponents/CreateProjectForm/CreateProjectForm.js";
import CreateProjectButton from "../../components/ProjectComponents/CreateProjectButton/CreateProjectButton.js";
import SearchForm from "../../components/utils/SearchForm.js";
import FilterButton from "../../components/utils/FilterButton.js";
import FilterAndSortForm from "../../components/utils/FilterAndSort.js";

import "../../styles/pages/UserHomepage.css";

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
        <div id="userHomepageHeader">
          <FilterButton />
          <SearchForm />
          <CreateProjectButton />
        </div>
        <div id="userHomepageTool">
          <CreateProjectForm />
          <FilterAndSortForm />
        </div>
        <div id="userHomepageBody">
          <div id="userHomepageMain">
            <ProjectList />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomepage;
