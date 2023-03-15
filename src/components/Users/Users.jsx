import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import { UserHandler } from "../../Helpers/UserHandler"
import UserCard from "./UserCard"

export default function Users() {
  const { user, logout, isUserLoggedIn } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [userJSX, setUserJSX] = useState(null)

  useEffect(() => {
    UserHandler.getAll(user)
    .then(list => setUsers(list))
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      let auxJSX = []
      for(let i=0; i<users.length; i++) {
        auxJSX.push(
          <UserCard key={i} user={users[i].user} />
        )
      }
      setUserJSX(auxJSX)
    } else {
      setUserJSX(null)
    }
  }, [users])

  return (
    <div className="home">
      {userJSX}
    </div>
  )
}