import { createSearchParams } from "react-router-dom";
import { cookies } from "../App";
const fetchDeleteProject = async (accountName, projectName) => {
  const environment = process.env.NODE_ENV;
  const deleteProjectAPI =
    process.env[
      `REACT_APP_DELETE_PROJECT_API_URL_${environment.toUpperCase()}`
    ];
  const searchQueryParams = {
    projectName,
  };
  const searchQueryString = createSearchParams(searchQueryParams);
  const endpoint = `${deleteProjectAPI}/${accountName}?${searchQueryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(endpoint, {
      method: "DELETE",
      headers: myHeaders,
    });

    const response = jsonResponse.json();

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const fetchCreateProject = async (
  accountName,
  projectName,
  projectDescription
) => {
  const environment = process.env.NODE_ENV;
  const createProjectAPI =
    process.env[
      `REACT_APP_CREATE_PROJECT_API_URL_${environment.toUpperCase()}`
    ];

  const endpoint = `${createProjectAPI}/${accountName}`;
  const body = JSON.stringify({ projectName, projectDescription });

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(endpoint, {
      method: "POST",
      body: body,
      headers: myHeaders,
    });

    const response = await jsonResponse.json();
    return response;
  } catch (err) {
    return err;
  }
};

const fetchUpdateProject = async (
  projectName,
  accountName,
  newProjectName,
  newProjectDescription
) => {
  const environment = process.env.NODE_ENV;
  const updateProjectAPI =
    process.env[
      `REACT_APP_UPDATE_PROJECT_API_URL_${environment.toUpperCase()}`
    ];

  const bodyInfo = {
    newProjectName,
    newProjectDescription,
  };

  const searchQueryParams = {
    projectName,
  };

  const searchQueryString = createSearchParams(searchQueryParams);
  const endpoint = `${updateProjectAPI}/${accountName}?${searchQueryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(bodyInfo),
      headers: myHeaders,
    });

    const response = await jsonResponse.json();
    return response;
  } catch (err) {
    return err;
  }
};
export { fetchCreateProject, fetchDeleteProject, fetchUpdateProject };
