import { useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { MenuToggle } from './MenuToggle'
import { AuthContext } from '../Auth/AuthProvider'
import { ThemeContext } from '../Theme/ThemeProvider'
import './Navbar.scss'
import Logo from '../Logo/Logo'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 99%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 50% 99%)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

export default function MobileMenu({ links }) {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAllowed, isUserLoggedIn } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const containerRef = useRef(null)

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
          <motion.li variants={itemVariants} onClick={() => toggleOpen()} key={i}>
            <Link to={links[i].to} key={i}>{linkContent}</Link>
          </motion.li>
        )
      } else {
        navLinks.push(
          <motion.li variants={itemVariants} onClick={() => toggleOpen()} key={i}>
            <a onClick={links[i].onClick} key={i}>{linkContent}</a>
          </motion.li>
        )
      }
    }
  }

  return (
    <motion.nav
      className="mobile-menu"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={"100vh"}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar}>
        <motion.ul
          key={"dropdown"}
          variants={{
            open: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              opacity: 0,
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
                delay: 0.1
              }
            }
          }}
          animate={isOpen ? "open" : "closed"}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li variants={itemVariants} onClick={() => {navigate("/");toggleOpen()}}>
            <AnimatePresence initial={false}>
            {isOpen && 
              <motion.div
                key={"logo-toggle"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{delay: 1}}
              >
                <Logo />
              </motion.div>
            }
            </AnimatePresence>
          </motion.li>
          {navLinks}
          <motion.li
            variants={itemVariants}
            onClick={() => toggleTheme()}
          >
            <a>
              <div className="navbar-link">
                <div className="top-link">
                  <div className="link-text">
                    <span className="material-icons link-icon">{(theme === "dark") ? "light_mode" : "dark_mode"}</span>
                    <span className="link-label">{(theme === "dark") ? "Modo claro" : "Modo oscuro"}</span>
                  </div>
                </div>
              </div>
            </a>
          </motion.li>
        </motion.ul>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
