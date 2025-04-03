import { Cookies } from "react-cookie";

async function fetchSignIn(accountName, password) {
  const environment = process.env.NODE_ENV;
  const signInAPI =
    process.env[`REACT_APP_LOGIN_API_URL_${environment.toUpperCase()}`];
  const signInEndpoint = `${signInAPI}`;

  const data = JSON.stringify({
    accountName,
    password,
  });
  try {
    const jsonResponse = await fetch(signInEndpoint, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchSignUp(accountName, profileName, password) {
  const environment = process.env.NODE_ENV;
  const signUpAPI =
    process.env[`REACT_APP_SIGN_UP_API_URL_${environment.toUpperCase()}`];
  const signUpEndpoint = `${signUpAPI}`;

  const data = JSON.stringify({
    accountName,
    profileName,
    password,
  });
  try {
    const jsonResponse = await fetch(signUpEndpoint, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await jsonResponse.json();

    return response;
  } catch (err) {
    throw new Error(err);
  }
}

const fetchFindAccount = async (accountName) => {
  const environment = process.env.NODE_ENV;
  const findAccountAPI =
    process.env[`REACT_APP_FIND_ACCOUNT_API_URL_${environment.toUpperCase()}`];
  const findAccountEndpoint = `${findAccountAPI}`;

  const body = JSON.stringify({
    accountName,
  });

  try {
    const jsonResponse = await fetch(findAccountEndpoint, {
      method: "POST",
      body,
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await jsonResponse.json();

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const fetchVerifyToken = async () => {
  const environment = process.env.NODE_ENV;
  const verifyTokenAPI =
    process.env[`REACT_APP_VERIFY_TOKEN_API_URL_${environment.toUpperCase()}`];
  const cookies = new Cookies();
  const verifyTokenEndpoint = `${verifyTokenAPI}`;
  const body = JSON.stringify({});

  const headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Authorization", "Bearer " + cookies.get("jwt"));

  try {
    const jsonResponse = await fetch(verifyTokenEndpoint, {
      method: "POST",
      body,
      headers: headers,
    });

    if (!jsonResponse.ok) {
      throw new Error();
    }
    const response = await jsonResponse.json();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { fetchSignIn, fetchSignUp, fetchFindAccount, fetchVerifyToken };
