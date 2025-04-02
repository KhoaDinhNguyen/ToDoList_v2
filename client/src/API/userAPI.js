import { createSearchParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const fetchUserDatabase = async (accountName) => {
  const environment = process.env.NODE_ENV;
  const cookies = new Cookies();

  const getUserDatabaseAPI =
    process.env[
      `REACT_APP_GET_USER_DATABASE_API_URL_${environment.toUpperCase()}`
    ];
  const getUserEndpoint = `${getUserDatabaseAPI}/${accountName}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookies.get("jwt"));
  try {
    const jsonResponse = await fetch(getUserEndpoint, {
      method: "GET",
      headers: myHeaders,
    });

    const response = await jsonResponse.json();
    return response;
  } catch (err) {
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
