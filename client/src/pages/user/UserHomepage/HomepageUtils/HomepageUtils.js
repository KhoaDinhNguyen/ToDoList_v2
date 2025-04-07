import FilterButton from "../../../../components/HomepageComponents/UtilsComponent/FilterButton/FilterButton";
import SearchForm from "../../../../components/HomepageComponents/UtilsComponent/SearchForm/SearchForm";
import CreateProjectButton from "../../../../components/ProjectComponents/CreateProjectButton/CreateProjectButton";

import styles from "./HomepageUtils.module.css";

function HomepageUtils() {
  return (
    <div className={styles.rootContainer}>
      <FilterButton />
      <SearchForm />
      <CreateProjectButton />
    </div>
  );
}

export default HomepageUtils;
