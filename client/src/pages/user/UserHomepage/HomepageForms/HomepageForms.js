import CreateProjectForm from "../../../../components/ProjectComponents/CreateProjectForm/CreateProjectForm";
import FilterAndSortForm from "../../../../components/HomepageComponents/FilterAndSortForm/FilterAndSortForm";

import styles from "./HomepageForm.module.css";

function HomepageForm() {
  return (
    <div className={styles.rootContainer}>
      <CreateProjectForm />
      <FilterAndSortForm />
    </div>
  );
}

export default HomepageForm;
