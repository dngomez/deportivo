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
    { name: "Inicio", to: "/", icon: "home", loggedOnly: false, showAlways: true},
    { name: "Calendario", to: "/calendar", icon: "calendar_month", loggedOnly: false, showAlways: true },
    { name: "Perfil", to: "/profile", icon: "face", loggedOnly: true, showAlways: false },
    { name: "Ingresar", to: undefined, icon: "login", loggedOnly: false, showAlways: false, onClick: () => navigate("/login", {state: {from: location.pathname}}) },
    { name: "Cerrar Sesión", to: undefined, icon: "logout", loggedOnly: true, showAlways: false, onClick: () => logout() }
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
