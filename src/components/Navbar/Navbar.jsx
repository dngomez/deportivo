import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../Theme/ThemeProvider'
import { motion } from 'framer-motion'
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
    { name: "Inicio", to: "/"},
    { name: "Calendario", to: "/calendar" },
    { name: "Link1", to: "/link1" },
    { name: "Link2", to: "/link2" },
    { name: "Link3", to: "/link3" },
    { name: "Link4", to: "/link4" },
    { name: "Link5", to: "/link5" }
  ]

  for (let i=0; i<links.length; i++) {
    navLinks.push(
      <Link to={links[i].to} onClick={links[i].click} key={i} className={`navbar-link ${(location.pathname === links[i].to) ? "active" : ""}`}>
        {links[i].name}
        {(location.pathname === links[i].to) ? <motion.div className="underline" layoutId="underline" /> : null}
      </Link>
    )
  }


  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/ main-title">
          <button className="p-button-text nav-btn main-title" >
            <span>Club</span>
            <span>Deportivo</span>
            <span>y</span>
            <span>Cultural</span>
            <span>AURA</span>
          </button>
        </Link>
      </div>
      <div className="right">
        {navLinks}
      </div>
    </nav>
  );
}
