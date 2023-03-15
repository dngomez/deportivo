import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Authentication } from "../../Helpers/Authentication";
import jwtDecode from "jwt-decode"


export const AuthContext = createContext(null);

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState(Authentication.getUser());
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(Authentication.getUser()))
  const location = useLocation()

  async function login(username, password) {
    let [user, message] = await Authentication.login(username, password)
    if (!Boolean(user)) return Promise.resolve(false)
    setUser(user)
    setIsUserLoggedIn(true)
    return Promise.resolve(true)
  }

  async function logout() {
    Authentication.logout()
    setUser(null)
    setIsUserLoggedIn(false)
  }

  function isTokenValid() {
    let decodedToken = jwtDecode(user.token)
    if (new Date() >= new Date(decodedToken.exp * 1000)) {
      logout()
      console.log("Tu sesión ha expirado")
      return false
    }
    return true
  }

  function isAllowed(role) {
    return Authentication.compareRoles(role)
  }

  async function getImage() {
    if (isUserLoggedIn) {
      return await Authentication.getImage(user)
    } else {
      return `/img/users/example-${user.gender}.jpg`
    } 
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      isTokenValid()
    }
  }, [location, children, user])

  let value = {
    user,
    login,
    logout,
    isTokenValid,
    getImage,
    isAllowed,
    isUserLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}