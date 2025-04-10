import { createSearchParams } from "react-router-dom";
import { cookies } from "../App";

const fetchUserDatabase = async (accountName, limitTime) => {
  const environment = process.env.NODE_ENV;

  const getUserDatabaseAPI =
    process.env[
      `REACT_APP_GET_USER_DATABASE_API_URL_${environment.toUpperCase()}`
    ];
  const getUserEndpoint = `${getUserDatabaseAPI}/${accountName}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(getUserEndpoint, {
      method: "GET",
      headers: myHeaders,
    });

    const response = await jsonResponse.json();
    if (!jsonResponse.ok) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    if (err.message === "Failed to fetch" && limitTime > 0) {
      console.log("Network failed, restart the database loading");
      return await fetchUserDatabase(accountName, limitTime - 1);
    } else if (err.message === "Failed to fetch" && limitTime === 0) {
      throw new Error("Network failed");
    }
    throw new Error(err.message);
  }
};

const fetchUserUpdate = async (
  accountName,
  type,
  newProfileName,
  newPassword
) => {
  const environment = process.env.NODE_ENV;
  const updateUserAPI =
    process.env[`REACT_APP_UPDATE_USER_API_URL_${environment.toUpperCase()}`];
  const searchParamsQuery = { type };
  const searchParamsString = createSearchParams(searchParamsQuery);
  const updateUserEndpoint = `${updateUserAPI}/${accountName}?${searchParamsString}`;
  const body = {};

  if (type === "password") {
    body.newPassword = newPassword;
  } else {
    body.newProfileName = newProfileName;
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  try {
    const jsonResponse = await fetch(updateUserEndpoint, {
      method: "PUT",
      body: JSON.stringify(body),
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

export { fetchUserDatabase, fetchUserUpdate };
