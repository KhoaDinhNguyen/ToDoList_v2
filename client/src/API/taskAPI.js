import { createSearchParams } from "react-router-dom";
import { cookies } from "../App";

const fetchTaskCreate = async (
  accountName,
  projectName,
  taskName,
  taskDescription,
  taskTimeDeadline
) => {
  const environment = process.env.NODE_ENV;
  const createTaskAPI =
    process.env[`REACT_APP_CREATE_TASK_API_URL_${environment.toUpperCase()}`];
  const createTaskEndpointAPI = `${createTaskAPI}/${accountName}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(createTaskEndpointAPI, {
      method: "POST",
      body: JSON.stringify({
        taskName,
        projectName,
        taskDescription,
        taskTimeDeadline,
      }),
      headers: myHeaders,
    });

    const response = await jsonResponse.json();

    if (!jsonResponse.ok) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

const fetchTaskDelete = async (accountName, projectName, taskName) => {
  const environment = process.env.NODE_ENV;
  const deleteTaskAPI =
    process.env[`REACT_APP_DELETE_TASK_API_URL_${environment.toUpperCase()}`];

  const searchQueryParams = {
    taskName,
    projectName,
  };

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  const searchQueryString = createSearchParams(searchQueryParams);
  const deleteTaskEndpoint = `${deleteTaskAPI}/${accountName}?${searchQueryString}`;

  try {
    const jsonResponse = await fetch(deleteTaskEndpoint, {
      method: "DELETE",
      headers: myHeaders,
    });
    const response = await jsonResponse.json();

    if (!jsonResponse.ok) {
      throw new Error(response.message);
    }

    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const fetchTaskUpdate = async (taskInfo, type) => {
  const environment = process.env.NODE_ENV;
  const updateTaskAPI =
    process.env[`REACT_APP_UPDATE_TASK_API_URL_${environment.toUpperCase()}`];
  const { taskName, projectName, newImportantStatus, accountName } = taskInfo;
  const endpoint = `${updateTaskAPI}/${accountName}/${type}`;

  const body = JSON.stringify({
    taskName,
    projectName,
    newImportantStatus,
  });

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(endpoint, {
      method: "PUT",
      headers: myHeaders,
      body: body,
    });

    const response = await jsonResponse.json();

    if (!jsonResponse.ok) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const featchTaskUpdateInfo = async (
  taskName,
  projectName,
  accountName,
  newTaskName,
  newTaskDescription,
  newTaskTimeDeadline
) => {
  const body = {
    projectName,
    taskName,
    newTaskName,
    newTaskDescription,
    newTaskTimeDeadline,
  };
  return fetchTaskUpdateAPI(body, "info", accountName);
};

const fetchTaskUpdateAPI = async (bodyObject, type, accountName) => {
  const environment = process.env.NODE_ENV;
  const updateTaskAPI =
    process.env[`REACT_APP_UPDATE_TASK_API_URL_${environment.toUpperCase()}`];
  const endpoint = `${updateTaskAPI}/${accountName}/${type}`;

  const body = JSON.stringify(bodyObject);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonRespone = await fetch(endpoint, {
      method: "PUT",
      headers: myHeaders,
      body: body,
    });

    const response = await jsonRespone.json();

    if (!jsonRespone.ok) {
      throw new Error(response.message);
    }

    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
export {
  fetchTaskCreate,
  fetchTaskUpdate,
  fetchTaskDelete,
  featchTaskUpdateInfo,
};
