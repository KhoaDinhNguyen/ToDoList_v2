import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { fetchVerifyToken } from "./API/pageAPI";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    if (jwt === undefined || jwt === "") {
      navigate("/homepage/aboutUs");
    } else {
      fetchVerifyToken()
        .then((response) => {
          navigate(`user/${response.id}`);
        })
        .catch((err) => {
          console.log(err);
          navigate("/homepage/aboutUs");
        });
    }
  }, [navigate]);

  return <></>;
}

export default Root;
