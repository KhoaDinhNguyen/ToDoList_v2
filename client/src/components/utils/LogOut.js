import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

import { LogOutSVG } from "./SVG";
import "../../styles/components/LogOut.css";

function LogOut(props) {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    const cookie = new Cookies();
    //localStorage.clear();
    cookie.remove("jwt");
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
