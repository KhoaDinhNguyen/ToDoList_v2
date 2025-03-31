import { useSelector } from "react-redux";

import TaskDisplay from "../TaskComponents/TaskDisplay";
import Project from "./Project/Project";

import { projectsSlice, tasksSlice } from "../../redux/databaseSlice";
import {
  searchSlice,
  sortTaskNameSlice,
  sortTimeCreatedSlice,
  sortTimeDeadlineSlice,
  filterImportantSlice,
  filterStatusSlice,
  filterTimeCreatedFromSlice,
  filterTimeCreatedToSlice,
  filterTimeDeadlineFromSlice,
  filterTimeDeadlineToSlice,
} from "../../redux/utilsSlice";

import { filterTask } from "../../utils/filterTask"; // filterTask(tasks, filterProjectName, filterStatus : [string], filterImportant : boolean, filterTimeCreatedFrom : string, filterTimeCreatedTo : string, filterTimeDeadlineFrom : string, filterTimeDeadlineTo : string) -> tasks
import { sortTask } from "../../utils/sortTask"; // sortTask(tasks, sortTaskName : boolean, sortTimeCreated: boolean, sortTimeDeadline : boolean) -> tasks
import { searchTask } from "../../utils/searchTask"; // searchTask(tasks, searchString : string) -> tasks;
import { splitTask } from "../../utils/finishTask"; // splitTask(tasks) -> [finishedTasks, unfinishedTasks]
import { countTask } from "../../utils/countTask"; // countTask(tasks) -> [numOfPendingTask: int, numOfFailingTask: int, numOfPendingTask: int]

import styles from "./ArrayProjects.module.css";

function ArrayProjects() {
  const projects = useSelector((state) => state[projectsSlice.name]);
  const tasks = useSelector((state) => state[tasksSlice.name]);
  /*
        filter slices
    */
  const filterStatus = useSelector((state) => state[filterStatusSlice.name]);
  const filterImportant = useSelector(
    (state) => state[filterImportantSlice.name]
  );
  const filterTimeCreatedFrom = useSelector(
    (state) => state[filterTimeCreatedFromSlice.name]
  );
  const filterTimeCreatedTo = useSelector(
    (state) => state[filterTimeCreatedToSlice.name]
  );
  const filterTimeDeadlineFrom = useSelector(
    (state) => state[filterTimeDeadlineFromSlice.name]
  );
  const filterTimeDeadlineTo = useSelector(
    (state) => state[filterTimeDeadlineToSlice.name]
  );

  /*
        sort slices
    */
  const sortTaskName = useSelector((state) => state[sortTaskNameSlice.name]);
  const sortTimeCreated = useSelector(
    (state) => state[sortTimeCreatedSlice.name]
  );
  const sortTimeDeadline = useSelector(
    (state) => state[sortTimeDeadlineSlice.name]
  );

  /*
        serach slices
    */
  const search = useSelector((state) => state[searchSlice.name]);

  const listProjectRender = [];

  for (const project of projects) {
    const { projectName } = project;
    const filterTasks = filterTask(
      tasks,
      projectName,
      filterStatus,
      filterImportant,
      filterTimeCreatedFrom,
      filterTimeCreatedTo,
      filterTimeDeadlineFrom,
      filterTimeDeadlineTo
    );
    const searchTasks = searchTask(filterTasks, search);
    const sortTasks = sortTask(
      searchTasks,
      sortTaskName,
      sortTimeCreated,
      sortTimeDeadline
    );
    const [finishedTasks, unfinishedTasks] = splitTask(sortTasks);
    const [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] =
      countTask(filterTasks);

    const [unfinishedTasksRender, finishedTasksRender] = [[], []];

    for (const task of unfinishedTasks) {
      unfinishedTasksRender.push(
        <TaskDisplay
          key={`${project.projectName}${task.taskName}`}
          task={task}
        />
      );
    }
    for (const task of finishedTasks) {
      finishedTasksRender.push(
        <TaskDisplay
          key={`${project.projectName}${task.taskName}`}
          task={task}
        />
      );
    }

    listProjectRender.push(
      <Project
        key={projectName}
        unfinishedTasksRender={unfinishedTasksRender}
        finishedTasksRender={finishedTasksRender}
        project={project}
        numOfPendingTask={numOfPendingTask}
        numOfFulfilledTask={numOfFulfilledTask}
        numOfFailingTask={numOfFailingTask}
      />
    );
  }

  return <ul className={styles.rootContainer}>{listProjectRender}</ul>;
}

export default ArrayProjects;
