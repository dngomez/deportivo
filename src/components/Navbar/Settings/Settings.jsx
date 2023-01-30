import { motion } from 'framer-motion'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../Theme/ThemeProvider';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  let theme = useContext(ThemeContext)

  return (
    <div className="link-text settings">
      <span onClick={() => setIsOpen(!isOpen)} className="material-icons link-icon">{isOpen ? "close" : "settings"}</span>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        animate={isOpen ? "open" : "closed"}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li
          variants={itemVariants} animate={isOpen ? "open" : "closed"}
          onClick={() => theme.toggleTheme()}
        >
          <span className="material-icons dropdown-icon">{(theme.theme === "dark") ? "light_mode" : "dark_mode"}</span>
          {(theme.theme === "dark") ? "Modo claro" : "Modo oscuro"}
        </motion.li>
        <motion.li variants={itemVariants} animate={isOpen ? "open" : "closed"}>Item 2</motion.li>
        <motion.li variants={itemVariants} animate={isOpen ? "open" : "closed"}>Item 3</motion.li>
        <motion.li variants={itemVariants} animate={isOpen ? "open" : "closed"}>Item 4</motion.li>
        <motion.li variants={itemVariants} animate={isOpen ? "open" : "closed"}>Item 5</motion.li>
      </motion.ul>
    </div>
  )
}