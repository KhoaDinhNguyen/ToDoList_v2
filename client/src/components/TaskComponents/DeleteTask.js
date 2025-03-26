import { useDispatch } from "react-redux";

import { fetchTaskDelete } from "../../API/taskAPI";
import { tasksSlice } from "../../redux/databaseSlice";
import "../../styles/components/DeleteTask.css";

function DeleteTask(props) {
  const dispatch = useDispatch();
  const { task, display, setDeleteDisplay, setTaskDetailDisplay } = props;
  const { taskName, projectName } = task;
  const accountName = localStorage.getItem("accountName");

  const onClickDeleteTaskButton = () => {
    fetchTaskDelete(accountName, projectName, taskName)
      .then((response) => {
        if (!response.error) {
          dispatch(
            tasksSlice.actions.remove({
              taskName,
              projectName,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickCancle = () => {
    setDeleteDisplay(false);
    setTaskDetailDisplay(false);
  };
  return (
    <div style={{ display: display }}>
      <div className="deletePrompt">
        <p>Do you really want to delete this task?</p>
        <div className="deleteTaskButton">
          <button
            onClick={onClickDeleteTaskButton}
            className="yesDeleteTaskButton"
          >
            <span>Yes</span>
          </button>
          <button onClick={onClickCancle} className="noDeleteTaskButton">
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
