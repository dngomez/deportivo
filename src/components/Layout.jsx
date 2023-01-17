import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
// import './Layout.scss'

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="body">
        <Outlet />
      </div>
    </div>
  )
}
