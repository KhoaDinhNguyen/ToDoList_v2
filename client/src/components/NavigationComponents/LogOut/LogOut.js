import { useNavigate } from "react-router-dom";
import { cookies } from "../../../App";

import { LogOutSVG } from "../../utils/SVG";
import styles from "./LogOut.module.css";

function LogOut(props) {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    cookies.remove("jwt");
    navigate("/homepage/login");
  };

  return (
    <div className={styles.rootContainer}>
      <button onClick={onClickLogOut} className={styles.buttonContainer}>
        <LogOutSVG />
      </button>
    </div>
  );
}

export default LogOut;
