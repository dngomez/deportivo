import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../Theme/ThemeProvider'
import { motion } from 'framer-motion'
import Logo from '../Logo/Logo'
import './Navbar.scss'

export default function Navbar() {
  let navigate = useNavigate()
  let location = useLocation()
  let { theme, toggleTheme, language, setLanguage } = useContext(ThemeContext)

  function userSession() {
    if (auth.isUserLoggedIn) {
      auth.signout()
    } else {
      navigate("/login")
    }
  }

  let navLinks = []
  let links = [
    { name: "Inicio", to: "/", icon: "home"},
    { name: "Calendario", to: "/calendar", icon: "calendar_month" },
    { name: "Link1", to: "/link1", icon: "face" },
    { name: "Link2", to: "/link2", icon: "face" },
    { name: "Link3", to: "/link3", icon: "face" },
    { name: "Link4", to: "/link4", icon: "face" },
    { name: "Link5", to: "/link5", icon: "face" }
  ]

  for (let i=0; i<links.length; i++) {
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
      </div>
    </nav>
  );
}
