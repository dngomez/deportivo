import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
// import './Layout.scss'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </>
  )
}
