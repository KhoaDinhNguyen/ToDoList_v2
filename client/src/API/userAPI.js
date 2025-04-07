import { createSearchParams } from "react-router-dom";
import { cookies } from "../App";

const fetchUserDatabase = async (accountName, limitTime) => {
  const environment = process.env.NODE_ENV;

  const getUserDatabaseAPI =
    process.env[
      `REACT_APP_GET_USER_DATABASE_API_URL_${environment.toUpperCase()}`
    ];
  const getUserEndpoint = `${getUserDatabaseAPI}/${accountName}`;
  // console.log(getUserEndpoint);
  // console.log("Bearer " + cookies.get("jwt"));
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  myHeaders.append("Content-type", "application/json");

  // fetch(getUserEndpoint, {
  //   method: "GET",
  //   headers: myHeaders,
  // })
  //   .then(async (jsonResponse) => {
  //     if (!jsonResponse.ok) {
  //       throw new Error();
  //     }
  //     return jsonResponse.json().then((response) => response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  try {
    //console.log("LET's GO");
    const jsonResponse = await fetch(getUserEndpoint, {
      method: "GET",
      headers: myHeaders,
    });

    if (!jsonResponse.ok) {
      throw new Error(
        await jsonResponse.json().then((response) => response.message)
      );
    }
    const response = await jsonResponse.json();

    return response;
  } catch (err) {
    console.log(err.message);
    if (err.message === "Failed to fetch" && limitTime > 0) {
      console.log("Network failed, restart the database loading");
      return await fetchUserDatabase(accountName, limitTime - 1);
    } else if (err.message === "Failed to fetch" && limitTime === 0) {
      throw new Error("Network failed");
    }
    throw new Error(err);
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

  try {
    const jsonResponse = await fetch(updateUserEndpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await jsonResponse.json();

    return response;
  } catch (err) {
    throw err;
  }
};

export { fetchUserDatabase, fetchUserUpdate };
