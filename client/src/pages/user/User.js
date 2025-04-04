import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Footer } from "../homepage/Homepage.js";
import { fetchUserDatabase } from "../../API/userAPI.js";

import {
  profileNameSlice,
  projectsSlice,
  tasksSlice,
} from "../../redux/databaseSlice.js";

import LogOut from "../../components/utils/LogOut.js";
import logoPage from "../../asset/img/logoPage.png";

import {
  HomepageSVG,
  DashboardSVG,
  CalendarSVG,
  ProfileSVG,
} from "../../components/utils/SVG.js";
import "../../styles/pages/User.css";

export const convertFromBooleanToDisplay = (display) => {
  return display ? "block" : "none";
};
export const convertDateToISOString = (day) => {
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();

  let monthString = `${month + 1}`;
  if (monthString.length === 1) monthString = `0${monthString}`;
  let dateString = `${date}`;
  if (dateString.length === 1) dateString = `0${dateString}`;

  return `${year}-${monthString}-${dateString}`;
};

function User() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navigationBarDisplay, setNavigationBarDisplay] = useState(true);

  const accountName = params.username;
  //const accountNameAuthen = localStorage.getItem("accountName");

  const onClickNavigationBarDisplay = () => {
    setNavigationBarDisplay(!navigationBarDisplay);
  };

  useEffect(() => {
    const cookies = new Cookies();
    // if (accountName !== accountNameAuthen) {
    //   alert("BAD");
    //   document.cookie = "";
    //   //localStorage.setItem("accountName", "");
    //   dispatch(profileNameSlice.actions.assignName(""));
    //   navigate("/homepage/login");
    // }
    // console.log(document.cookie);
    // if (document.cookie === "") {
    //   alert("PLEASE SIGN IN");
    //   navigate("/homepage/login");
    // }

    // const cookieArray = document.cookie
    //   .split(";")
    //   .map((cookie) => cookie.split("="));

    // console.log(cookieArray);
    // let jwt = "";
    // console.log(cookieArray);

    // for (let i = 0; i < cookieArray.length; ++i) {
    //   if (cookieArray[i][0] === "jwt") {
    //     jwt = cookieArray[i][1];
    //   }
    // }

    // console.log(jwt);
    // if (jwt === "") {
    //   alert("BAD CREDENTIA");
    //   navigate("/homepage/login");
    // }
    if (!cookies.get("jwt") || cookies.get("jwt") === "") {
      alert("BAD CREDENTIAL. Please Log In");
      cookies.remove("jwt");
      navigate("/homepage");
      return <></>;
    }

    fetchUserDatabase(accountName)
      .then((response) => {
        dispatch(tasksSlice.actions.initialize(response));
        dispatch(projectsSlice.actions.initialize(response));
        dispatch(profileNameSlice.actions.assignName(response[0].profileName));
        navigate("homepage");
      })
      .catch((err) => {
        alert("BAD CREDENTIAL. Please Log In Your Account");
        cookies.remove("jwt");
        navigate("/homepage");
        console.log(err);
      });
  }, [dispatch, navigate, accountName]);

  const linkIsActive = ({ isActive }) => {
    return isActive ? "match" : "noMatch";
  };

  return (
    <div id="user">
      <Header
        navigationBarDisplay={navigationBarDisplay}
        onClickNavigationBarDisplay={onClickNavigationBarDisplay}
      />
      <div id="userPage">
        <div
          id="userNavigationBar"
          className={
            navigationBarDisplay
              ? "navigationBarDisplay"
              : "nonNavigationBarDisplay"
          }
        >
          <div id="userNavigationBarBody">
            <div id="userNavigationBarHeader">
              <div id="companyName">
                <img src={logoPage} alt="logoPage" />
              </div>
            </div>
            <PageNavigation linkIsActive={linkIsActive} />
            <LogOut />
          </div>
        </div>
        <div id="userContent">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default User;

function NavigationBarArrow(props) {
  const { onClick } = props;

  return (
    <div onClick={onClick}>
      <svg
        fill="#000000"
        width="35px"
        height="35px"
        viewBox="-250 -250 1500.00 1500.00"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0">
          <rect
            x="-250"
            y="-250"
            width="1500.00"
            height="1500.00"
            rx="0"
            fill="#ffffff"
            strokeWidth="0"
          />
        </g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path d="M20 818h958V712H20v106zm0-266h958V446H20v106zm0-372v106h958V180H20z" />
        </g>
      </svg>
    </div>
  );
}

function Header(props) {
  const { navigationBarDisplay, onClickNavigationBarDisplay } = props;

  return (
    <header>
      <div id="displayNavigationBarFunction">
        <NavigationBarArrow
          navigationBarDisplay={navigationBarDisplay}
          onClick={onClickNavigationBarDisplay}
        />
      </div>
    </header>
  );
}

function PageNavigation({ linkIsActive }) {
  return (
    <nav id="pageNavigation">
      <ul>
        <li>
          <NavLink to="homepage" className={linkIsActive}>
            <HomepageSVG />
          </NavLink>
        </li>
        <li>
          <NavLink to="dashboard" className={linkIsActive}>
            <DashboardSVG />
          </NavLink>
        </li>
        <li>
          <NavLink to="calendar" className={linkIsActive}>
            <CalendarSVG />
          </NavLink>
        </li>
        <li>
          <NavLink to="profile" className={linkIsActive}>
            <ProfileSVG />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
