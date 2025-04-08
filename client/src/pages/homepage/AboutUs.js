import { Helmet } from "react-helmet";

import AboutUsIntro from "./AboutUs/AboutUsIntro/AboutUsIntro";
import AboutUsFeatures from "./AboutUs/AboutUsFeatures/AboutUsFeatures";
import "../../styles/pages/AboutUs.css";

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | ToDo List</title>
      </Helmet>
      <div id="aboutUs">
        <AboutUsIntro />
        <AboutUsFeatures />
      </div>
    </>
  );
}

// function AboutUsIntro() {
//   const navigate = useNavigate();

//   return (
//     <div id="aboutUsIntro">
//       <div id="introContent">
//         <div>
//           <h3 className="title">WHO ARE WE?</h3>
//           <h2>Master Your Day with MasterTask</h2>
//           <p>
//             A free web-based application to help users organize their tasks,
//             checklists efficiently and save tons of time.
//           </p>
//           <button
//             onClick={() => {
//               navigate("/homepage/login");
//             }}
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//       <div id="introImg">
//         <div>
//           <img src={todoListImg} alt="ToDoList Website" />
//         </div>
//       </div>
//     </div>
//   );
// }

export default AboutUs;
