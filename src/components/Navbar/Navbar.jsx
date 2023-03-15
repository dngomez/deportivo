import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../Logo/Logo'
import Settings from './Settings/Settings'
import { AuthContext } from '../Auth/AuthProvider'
import './Navbar.scss'

export default function Navbar({ links }) {
  const location = useLocation()
  const { isAllowed, isUserLoggedIn } = useContext(AuthContext)

  let navLinks = []
  for (let i=0; i<links.length; i++) {
    let shouldBeDisplayed = false
    if (links[i].permissionRequired === "None") {
      shouldBeDisplayed = true
    } else if (links[i].permissionRequired === "Unlogged") {
      if (!isUserLoggedIn)
        shouldBeDisplayed = true
    } else {
      if (isUserLoggedIn) {
        shouldBeDisplayed = isAllowed(links[i].permissionRequired)
      }
    }

    if (shouldBeDisplayed) {
      let linkContent = (
        <div className="navbar-link">
          {(`/${location.pathname.split("/")[1]}` === links[i].to) ?
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
            <div className={(`/${location.pathname.split("/")[1]}` === links[i].to) ? "link-text active":"link-text"}>
              <span className="material-icons link-icon">{links[i].icon}</span>
              <span className="link-label">{links[i].name}</span>
            </div>
          </div>
        </div>
      )

      if (Boolean(links[i].to)) {
        navLinks.push(
          <Link to={links[i].to} key={i}>{linkContent}</Link>
        )
      } else {
        navLinks.push(
          <a onClick={links[i].onClick} key={i}>{linkContent}</a>
        )
      }
    }
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
