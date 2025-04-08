import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchVerifyToken } from "../../API/pageAPI";
import { useEffect } from "react";

import { cookies } from "../../App";
import HomepageFooter from "./HomepageFooter/HomepageFooter";
import HomepageHeader from "./HomepageHeader/HomepageHeader";

//import "../../styles/pages/Homepage.css";

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
      <HomepageHeader />
      <main>
        <Outlet />
      </main>
      <HomepageFooter />
    </div>
  );
}

export default HomePage;
