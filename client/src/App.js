import "./App.css";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { CookiesProvider, Cookies } from "react-cookie";
import Root from "./Root";

import Login from "./pages/homepage/Login/Login";
import SignUp from "./pages/homepage/SignUp/SignUp";
import PageNotFound from "./pages/homepage/PageNotFound";
import ForgetPassword from "./pages/homepage/ForgetPassword";

import AboutUs from "./pages/homepage/AboutUs";
import HomePage from "./pages/homepage/Homepage";

import User from "./pages/user/User";
import UserHomepage from "./pages/user/UserHomepage/UserHomepage";
import UserDashboard from "./pages/user/UserDashboard/UserDashboard";
import UserCalendar from "./pages/user/UserCalendar/UserCalendar";
import UserProfile from "./pages/user/UserProfile/UserProfile";

export const cookies = new Cookies();

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} />
      <Route path="homepage" element={<HomePage />}>
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="user/:username" element={<User />}>
        <Route path="homepage" element={<UserHomepage />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="calendar" element={<UserCalendar />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;
