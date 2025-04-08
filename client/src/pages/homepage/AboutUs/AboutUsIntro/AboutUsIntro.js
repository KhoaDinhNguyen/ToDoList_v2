import { useNavigate } from "react-router-dom";

import todoListImg from "../../../../asset/img/todoList.png";

import styles from "./AboutUsIntro.module.css";

function AboutUsIntro() {
  const navigate = useNavigate();

  return (
    <div className={styles.rootContainer}>
      <div className={styles.contentContainer}>
        <div>
          <h3 className={styles.title}>WHO ARE WE?</h3>
          <h2 className={styles.message}>Master Your Day with MasterTask</h2>
          <p className={styles.text}>
            A free web-based application to help users organize their tasks,
            checklists efficiently and save tons of time.
          </p>
          <button
            onClick={() => {
              navigate("/homepage/login");
            }}
            className={styles.button}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div>
          <img
            src={todoListImg}
            alt="ToDoList Website"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsIntro;
