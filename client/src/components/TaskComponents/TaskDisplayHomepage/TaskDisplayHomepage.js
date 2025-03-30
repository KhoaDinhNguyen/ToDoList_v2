import ImportantStar from "../../utils/ImportantStar/ImportantStar";
import FulfilledBox from "../../utils/FulfilledBox/FulfilledBox";
import InfoText from "../../utils/InfoText/InfoText";
import UpdateTaskForm from "../UpdateTaskForm/UpdataTaskForm";
import DeleteTaskForm from "../DeleteTaskForm/DeleteTaskForm";

import { convertFromBooleanToDisplay } from "../../../pages/user/User";

import informationLogo from "../../../asset/img/informationDisplay.png";
import editLogo from "../../../asset/img/editDisplay.png";
import deleteLogo from "../../../asset/img/deleteDisplay.png";

import styles from "./TaskDisplayHomepage.module.css";

function TaskDisplayHomepage(props) {
  const {
    task,
    onChangeTaskStatus,
    onClickImportant,
    onChangeTaskDetailDisplay,
    setDeleteDisplay,
    setEditDisplay,
    currentImportant,
    currentStatus,
    finish,
    taskDetailDisplay,
    deleteDisplay,
    editDisplay,
    taskDescriptionDisplay,
    onClickEdit,
    onClickInfo,
    onClickDelete,
    setTaskDetailDisplay,
  } = props;
  const { taskName, projectName } = task;

  return (
    <li className={`${styles.rootContainer}`}>
      <div className={styles.fulfilledContainer}>
        {!finish && (
          <FulfilledBox
            id={`${taskName}_${projectName}_fulfilled`}
            onChangeTaskStatus={onChangeTaskStatus}
            currentStatus={currentStatus}
          ></FulfilledBox>
        )}
      </div>
      <div className={styles.taskNameContainer}>
        <ImportantStar
          id={`${taskName}_${projectName}_important`}
          currentImportant={currentImportant}
          onClickImportant={onClickImportant}
        />
        <p>{taskName}</p>
      </div>
      <div
        className={`${styles.taskStatusContainer} ${
          styles[`${currentStatus}_task`]
        }`}
      >
        <p>
          {currentStatus.substr(0, 1).toUpperCase() + currentStatus.substr(1)}
        </p>
      </div>
      <div className={styles.taskFunctionContainer}>
        <img
          src={informationLogo}
          alt="Info"
          title="Info"
          onClick={onClickInfo}
        />
        {!finish && (
          <>
            <img src={editLogo} alt="Edit" title="Edit" onClick={onClickEdit} />
            <img
              src={deleteLogo}
              alt="Delete"
              title="Delete"
              onClick={onClickDelete}
            />
          </>
        )}
      </div>
      <TaskInfoHomepage
        task={task}
        finish={finish}
        taskDetailDisplay={taskDetailDisplay}
        deleteDisplay={deleteDisplay}
        setDeleteDisplay={setDeleteDisplay}
        editDisplay={editDisplay}
        setEditDisplay={setEditDisplay}
        onChangeTaskDetailDisplay={onChangeTaskDetailDisplay}
        taskDescriptionDisplay={taskDescriptionDisplay}
        setTaskDetailDisplay={setTaskDetailDisplay}
      />
    </li>
  );
}

function TaskInfoHomepage(props) {
  const {
    task,
    finish,
    taskDetailDisplay,
    deleteDisplay,
    setDeleteDisplay,
    editDisplay,
    setEditDisplay,
    taskDescriptionDisplay,
    setTaskDetailDisplay,
  } = props;

  const {
    taskTimeDeadline,
    taskTimeCreated,
    taskDescription,
    taskName,
    taskStatus,
  } = task;

  return (
    <div className={styles.taskInfoContainer}>
      <div
        className={styles.taskInfoDescription}
        style={{
          display: convertFromBooleanToDisplay(taskDescriptionDisplay),
        }}
      >
        <InfoText title="Task name">
          <p>{taskName}</p>
        </InfoText>
        <InfoText title="Task description">
          <p>{taskDescription}</p>
        </InfoText>
        <InfoText title="Task time created">
          <p>{taskTimeCreated}</p>
        </InfoText>
        <InfoText title="Task time deadline">
          <p>{taskTimeDeadline.slice(0, 10)}</p>
        </InfoText>
        <InfoText title="Task status">
          <p>{taskStatus.substr(0, 1).toUpperCase() + taskStatus.substr(1)}</p>
        </InfoText>
        {finish && (
          <div>
            <span className="note">
              &#9432; Cannot edit or delete finised task
            </span>
          </div>
        )}
      </div>
      <UpdateTaskForm
        task={task}
        display={convertFromBooleanToDisplay(editDisplay)}
        setEditDisplay={setEditDisplay}
        setTaskDetailDisplay={setTaskDetailDisplay}
      />
      <DeleteTaskForm
        task={task}
        display={convertFromBooleanToDisplay(deleteDisplay)}
        setDeleteDisplay={setDeleteDisplay}
        setTaskDetailDisplay={setTaskDetailDisplay}
      />
    </div>
  );
}

export default TaskDisplayHomepage;
