import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PieController,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./DashboardChart.module.css";

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Title);
Chart.register(PieController);
Chart.register(Tooltip);
Chart.register(Legend);

function DashboardChart(props) {
  const {
    totalNumTask,
    numFinishedTask,
    numUnfinishedTask,
    numPendingTask,
    numFailingTask,
    numFulfilledTask,
  } = props;

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.barChart}>
        <Bar
          data={{
            labels: ["Total task", "Finished task", "Unfinished task"],
            datasets: [
              {
                label: "Task",
                data: [totalNumTask, numFinishedTask, numUnfinishedTask],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              customCanvasBackgroundColor: {
                color: "#fff",
              },
              title: {
                display: true,
                text: "Task number",
              },
            },
            maintainAspectRatio: true,
          }}
          plugins={[plugin]}
        />
      </div>

      <div className={styles.pieChart}>
        <Pie
          data={{
            labels: ["Pending", "Fulfilled", "Failing"],
            datasets: [
              {
                label: "Number of tasks",
                data: [numPendingTask, numFulfilledTask, numFailingTask],
                backgroundColor: ["#FF8C00", "#50C878", "#FF748B"],
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            plugins: {
              customCanvasBackgroundColor: {
                color: "#fff",
              },
              title: {
                display: true,
                text: "Percentage of task status",
              },
            },
            maintainAspectRatio: true,
          }}
          plugins={[plugin]}
        />
      </div>
    </div>
  );
}

export default DashboardChart;
