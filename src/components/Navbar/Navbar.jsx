import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../Logo/Logo'
import Settings from './Settings/Settings'
import { AuthContext } from '../Auth/AuthProvider'
import './Navbar.scss'

export default function Navbar() {
  let location = useLocation()
  const { user, logout, isUserLoggedIn } = useContext(AuthContext)

  let navLinks = []
  let links = [
    { name: "Inicio", to: "/", icon: "home", loggedOnly: false},
    { name: "Calendario", to: "/calendar", icon: "calendar_month", loggedOnly: false },
    { name: "Perfil", to: "/profile", icon: "face", loggedOnly: true }
    // { name: "Link1", to: "/link1", icon: "face" },
    // { name: "Link2", to: "/link2", icon: "face" },
    // { name: "Link3", to: "/link3", icon: "face" }
  ]

  for (let i=0; i<links.length; i++) {
    if (!links[i].loggedOnly || isUserLoggedIn)
      navLinks.push(
        <Link to={links[i].to} key={i}>
          <div className="navbar-link">
            {(location.pathname === links[i].to) ?
              <motion.div
                className="active-link"
                layoutId="activeLink"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 50
                }}
              >
                <div className="left">
                  <div className="border"/>
                </div>
                <div className="right">
                  <div className="border"/>
                </div>
                <div className="link-text transparent">
                  <span className="material-icons link-icon">{links[i].icon}</span>
                  <span className="link-label">{links[i].name}</span>
                </div>
              </motion.div>
              : null
            }
            <div className="top-link">
              <div className={(location.pathname === links[i].to) ? "link-text active":"link-text"}>
                <span className="material-icons link-icon">{links[i].icon}</span>
                <span className="link-label">{links[i].name}</span>
              </div>
            </div>
          </div>
        </Link>
      )
  }


  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="navbar-link main-title">
          <Logo />
        </Link>
      </div>
      <div className="right">
        {navLinks}
        <Settings />
      </div>
    </nav>
  );
}
