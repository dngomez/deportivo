import { createContext, useState, ReactNode } from "react";
import { Authentication } from "../../Helpers/Authentication";


export const AuthContext = createContext(null);

export default function AuthProvider ({ children }) {
  let [user, setUser] = useState(Authentication.getUser());
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(Authentication.getUser()))

  let signin = async (username, password) => {
    let [user, message] = await Authentication.signin(username, password)
    if (!Boolean(user)) return Promise.resolve(false)
    setUser(user)
    setIsUserLoggedIn(true)
    return Promise.resolve(true)
  };

  let signout = async () => {
    await Authentication.signout()
    setUser(null)
    setIsUserLoggedIn(false)
  };

  let value = { user, signin, signout, isUserLoggedIn };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}