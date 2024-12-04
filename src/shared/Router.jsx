import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Youtube from '../pages/youtube/Youtube';
import Home from '../pages/Home/Home';
import Map from '../pages/Home/Map';
import Detail from '../pages/Detail/Detail';
import RecoverPassword from "../pages/auth/RecoverPassword";
import LikedPlaces from '../pages/Home/LikedPlaces';

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/:id/:name" element={<Detail />} />
          <Route path='likes' element={<LikedPlaces />} />
          <Route path="/youtube" element={<Youtube />} />
        </Routes>
      </BrowserRouter>
    );
};

export default Router;