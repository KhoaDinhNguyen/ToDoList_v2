import FilterButton from "../../../../components/HomepageComponents/UtilsComponent/FilterButton/FilterButton";
import SearchForm from "../../../../components/HomepageComponents/UtilsComponent/SearchForm/SearchForm";
import CreateProjectButton from "../../../../components/ProjectComponents/CreateProjectButton/CreateProjectButton";

function HomepageUtils() {
  return (
    <div id="userHomepageHeader">
      <FilterButton />
      <SearchForm />
      <CreateProjectButton />
    </div>
  );
}

export default HomepageUtils;
