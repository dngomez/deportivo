import { useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import "./Profile.scss"


function isoStringToLocale(date) {
  return `${date.substring(8,10)}-${date.substring(5,7)}-${date.substring(0,4)}`
}

export default function Home () {
  let { user, logout, isUserLoggedIn } = useContext(AuthContext)

  return (
    <div className="profile">
      <h3 style={{marginTop: 0}}>{`Hola ${user.user.first_name}`}</h3>
      <p>Los datos que tenemos registrados en tu cuenta son los siguientes:</p>
      <ul>
        <li><span>Nombres:</span><span>{user.user.first_name}</span></li>
        <li><span>Apellidos:</span><span>{user.user.last_name}</span></li>
        <li><span>Correo:</span><span>{user.user.email}</span></li>
        <li><span>Fecha de nacimiento:</span><span>{isoStringToLocale(user.user.birthday)}</span></li>
        <li><span>Miembro del club deportivo:</span><span>{user.user.subscribed ? "Sí" : "No"}</span></li>
      </ul>
    </div>
  )
}