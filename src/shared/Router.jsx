import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Youtube from "../pages/youtube/Youtube";
import Home from "../pages/Home/Home";
import Map from "../pages/Home/Map";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/youtube" element={<Youtube />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
