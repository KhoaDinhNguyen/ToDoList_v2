import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserDatabase } from "../../API/userAPI.js";
import { userSlice } from "../../redux/userSlice.js";
import { cookies } from "../../App.js";
import {
  profileNameSlice,
  projectsSlice,
  tasksSlice,
} from "../../redux/databaseSlice.js";

import UserHeader from "./UserHeader/UserHeader.js";
import NavigationBar from "../../components/NavigationComponents/NavigationBar/NavigationBar.js";
import UserFooter from "./UserFooter/UserFooter.js";
import LoadingDatabaseModal from "../../components/HomepageComponents/LoadingDatabaseModal/LoadingDatabaseModal.js";

import styles from "./User.module.css";

function User() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navigationBarDisplay, setNavigationBarDisplay] = useState(true);
  const [loadingDatabase, setLoadingDatabase] = useState(false);
  const [, setMessage] = useState("");
  const accountName = params.username;

  const onClickNavigationBarDisplay = () => {
    setNavigationBarDisplay(!navigationBarDisplay);
  };

  useEffect(() => {
    setLoadingDatabase(true);
    if (!cookies.get("jwt") || cookies.get("jwt") === "") {
      cookies.remove("jwt");
      navigate("/credential");
    } else {
      fetchUserDatabase(accountName, 5)
        .then((response) => {
          dispatch(tasksSlice.actions.initialize(response));
          dispatch(projectsSlice.actions.initialize(response));
          dispatch(
            profileNameSlice.actions.assignName(response[0].profileName)
          );
          dispatch(userSlice.actions.apply(accountName));
          setLoadingDatabase(false);
          navigate("homepage");
        })
        .catch((err) => {
          if (err.message === "Network failed") {
            navigate("homepage");
            setMessage(
              "Network failed, loading database is failed. Try reload the page again"
            );
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            cookies.remove("jwt");
            navigate("/credential");
          }
        });
    }
  }, [dispatch, navigate, accountName]);

  return (
    <>
      <div>
        <UserHeader onClickHandler={onClickNavigationBarDisplay} />
        <main className={styles.mainContainer}>
          <NavigationBar navigationBarDisplay={navigationBarDisplay} />
          <div className={styles.outlet}>
            <Outlet />
          </div>
          <UserFooter />
        </main>
      </div>
      <LoadingDatabaseModal visible={loadingDatabase === true} />
    </>
  );
}

export default User;
