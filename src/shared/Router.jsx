import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Youtube from "../pages/youtube/Youtube";
import Home from "../pages/Home/Home";
import Map from "../pages/Home/Map";
import Detail from "../pages/Detail/Detail";
import GoogleCallback from "../pages/auth/GoogleCallback";
import LikedPlaces from "../pages/Home/LikedPlaces";

// likes 부분 어.. 네.. 저것만 protected Routes 할거에요!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login/google/callback" element={<GoogleCallback/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/:id/:name" element={<Detail />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/likes" element={<LikedPlaces />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;