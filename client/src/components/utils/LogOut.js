import { useNavigate } from "react-router-dom";
import { cookies } from "../../App";

import { LogOutSVG } from "./SVG";
import "../../styles/components/LogOut.css";

function LogOut(props) {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    //localStorage.clear();
    cookies.remove("jwt");
    navigate("/homepage/login");
  };

  return (
    <div id="userNavigationBarFooter">
      <button onClick={onClickLogOut} id="logOut">
        <LogOutSVG />
      </button>
    </div>
  );
}

export default LogOut;
