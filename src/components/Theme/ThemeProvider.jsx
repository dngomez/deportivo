import { useContext } from "react"
import { createContext, useState, useEffect } from "react"
import { AuthContext } from "../Auth/AuthProvider"


export const ThemeContext = createContext(null)

export default function ThemeProvider ({ children }) {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('es')
  const { user, isUserLoggedIn } = useContext(AuthContext)

  function toggleTheme() {
    setTheme((theme === "dark") ? "light" : "dark")
  }

  useEffect(() => {
    if (!isUserLoggedIn) return
    setTheme(user.user.theme)
  }, [user])

  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, language, setLanguage }}>
      { children }
    </ThemeContext.Provider>
  );
}