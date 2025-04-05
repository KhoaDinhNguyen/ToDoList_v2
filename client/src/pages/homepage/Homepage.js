import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchVerifyToken } from "../../API/pageAPI";
import { useEffect } from "react";

import { cookies } from "../../App";
import logoPage from "../../asset/img/logoPage.png";
import "../../styles/pages/Homepage.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = cookies.get("jwt");

    if (jwt === undefined || jwt === "") {
      navigate("/homepage/login");
    } else {
      fetchVerifyToken()
        .then((response) => {
          navigate(`/user/${response.id}`);
        })
        .catch((err) => {
          console.log(err);
          navigate("/homepage/login");
        });
    }
  }, [navigate]);

  return (
    <div id="homepage">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const activeLink = ({ isActive }) => (isActive ? "active" : "nonActive");

  return (
    <header>
      <div className="companyName">
        <img
          src={logoPage}
          alt="Company logo"
          onClick={() => {
            navigate("./aboutUs");
          }}
          title="MasterTask"
        />
        <p>MasterTask</p>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="aboutUs" className={activeLink}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="login" className={activeLink}>
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="signUp" className={activeLink}>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="companyName">
        <img src={logoPage} alt="Company logo" title="MasterTask" />
        <p>MasterTask</p>
      </div>
      <div id="footerInfo">
        <div id="footerMessage">
          <p>
            Stay organized and achieve more with MasterTask. Put your
            productivity on autopilot.
          </p>
        </div>
        <div id="contact">
          <p>khoacode1305@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default HomePage;
