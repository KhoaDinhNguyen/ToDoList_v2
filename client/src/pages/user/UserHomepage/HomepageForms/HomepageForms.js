import CreateProjectForm from "../../../../components/ProjectComponents/CreateProjectForm/CreateProjectForm";
import FilterAndSortForm from "../../../../components/HomepageComponents/FilterAndSortForm/FilterAndSortForm";

function HomepageForm() {
  return (
    <div id="userHomepageTool">
      <CreateProjectForm />
      <FilterAndSortForm />
    </div>
  );
}

export default HomepageForm;
