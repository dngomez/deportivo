import { createContext, useState, useEffect } from "react"


export const ThemeContext = createContext(null)

export default function ThemeProvider ({ children }) {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('es')

  function toggleTheme() {
    setTheme((theme === "dark") ? "light" : "dark")
  }

  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage }}>
      { children }
    </ThemeContext.Provider>
  );
}