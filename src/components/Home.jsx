import { useContext } from "react"
import { AuthContext } from "./Auth/AuthProvider"
import AnimatedCharacters from "./Logo/AnimatedText"
import "./Home.scss"

export default function Home () {
  const { user, logout, isUserLoggedIn } = useContext(AuthContext)

  let paragraphs = [
    "Bienvenido a la página web del Club Deportivo y Cultural AURA",
  ]

  let showText = []
  let accumDelay = 0
  let deltaT = 0.02
  for (let i=0; i < paragraphs.length; i++) {
    showText.push(
      <AnimatedCharacters style={{marginTop: "10px"}} text={paragraphs[i]} initialDelay={accumDelay} separation={deltaT} key={i} />
    )
    accumDelay += paragraphs[i].length * deltaT
  }

  return (
    <div className="home">
      {showText}
    </div>
  )
}