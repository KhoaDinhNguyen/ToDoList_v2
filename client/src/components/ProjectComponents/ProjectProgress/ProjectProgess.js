import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PieController,
  Tooltip,
} from "chart.js";

import styles from "./ProjectProgress.module.css";

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PieController);
Chart.register(Tooltip);

function ProjectProgress(props) {
  const { numOfFulfilledTask, numOfPendingTask, numOfFailingTask } = props;
  const numOfTask = numOfFulfilledTask + numOfPendingTask + numOfFailingTask;

  const dataWithNumOfTaskDiff0 = {
    labels: [],
    datasets: [
      {
        data: [numOfPendingTask, numOfFulfilledTask, numOfFailingTask],
        backgroundColor: ["#FF8C00", "#50C878", "#FF748B"],
        hoverOffset: 4,
      },
    ],
  };

  const dataWithNumOfTaskEqual0 = {
    labels: [],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#000"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className={styles.rootContainer}>
      {numOfTask !== 0 && (
        <Pie
          data={dataWithNumOfTaskDiff0}
          options={{
            maintainAspectRatio: true,
          }}
        />
      )}
      {numOfTask === 0 && (
        <Pie
          data={dataWithNumOfTaskEqual0}
          options={{
            maintainAspectRatio: true,
            events: [],
          }}
        />
      )}
    </div>
  );
}

export default ProjectProgress;
