import { useEffect, useState, useContext } from "react"
import { AuthContext } from "./Auth/AuthProvider"

export default function Home () {
  let { user, logout, isUserLoggedIn } = useContext(AuthContext)
  // useEffect(() => {
  //   fetch("/api/user/")
  //   .then(res => res.json())
  //   .then(data => setUser(data.results))
  //   .catch(err => console.log(err))
  // }, [])

  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}