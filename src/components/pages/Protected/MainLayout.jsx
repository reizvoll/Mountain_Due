import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

export default MainLayout
