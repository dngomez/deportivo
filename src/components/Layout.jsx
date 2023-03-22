import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import Navbar from './Navbar/Navbar'
import { AuthContext } from './Auth/AuthProvider'
import MobileMenu from './Navbar/MobileMenu'
// import './Layout.scss'


export default function Layout() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const location = useLocation()

  let links = [
    { name: "Inicio", to: "/", icon: "home", permissionRequired: "None"},
    { name: "Calendario", to: "/calendar", icon: "calendar_month", permissionRequired: "None" },
    { name: "Deportes", to: "/sports", icon: "sports", permissionRequired: "None" },
    { name: "Perfil", to: "/profile", icon: "face", permissionRequired: "User" },
    { name: "Users", to: "/users", icon: "group", permissionRequired: "Staff" },
    { name: "Contacto", to: "/contact", icon: "support_agent", permissionRequired: "None"},
    { name: "Ingresar", to: undefined, icon: "login", permissionRequired: "Unlogged", onClick: () => navigate("/login", {state: {from: location.pathname}}) },
    { name: "Cerrar Sesión", to: undefined, icon: "logout", permissionRequired: "User", onClick: () => logout() }
  ]
  return (
    <>
      <Navbar links={links} />
      <div className="main">
        <Outlet />
      </div>
      <MobileMenu links={links} />
    </>
  )
}
