import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import Home from '../pages/un-protected/Home'
import ProtectedHome from '../pages/protected/ProtectedHome'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Home />} />
        <Route path="/main" element={<ProtectedHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
