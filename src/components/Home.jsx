import { useContext } from "react"
import { AuthContext } from "./Auth/AuthProvider"
import AnimatedCharacters from "./Logo/AnimatedText"
import "./Home.scss"

export default function Home () {
  const { user, logout, isUserLoggedIn } = useContext(AuthContext)

  let paragraphs = [
    "Bienvenido a la página web del Club Deportivo y Cultural AURA",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt a risus sit amet tempus. Maecenas eu finibus leo, id blandit erat. Praesent ut dapibus risus. Suspendisse finibus nisl vel mi sollicitudin varius. Fusce ac erat sit amet lorem consectetur feugiat. Curabitur lobortis at augue eget iaculis. Proin efficitur tortor sed mauris dapibus euismod. Mauris nec enim leo.`,
    `Sed dignissim velit ut orci blandit, eu faucibus erat fermentum. Vestibulum dictum orci rutrum justo mollis, quis bibendum quam ornare. Nulla vitae massa aliquet, interdum nibh vitae, laoreet dui. Phasellus vel iaculis felis. Nam interdum ipsum eu ex pulvinar, in molestie lacus fermentum. Donec malesuada ipsum ut neque elementum tempor. Suspendisse vestibulum ornare odio, vel condimentum nulla auctor vel. Aenean purus dolor, viverra ut ex consequat, euismod gravida diam. Etiam hendrerit, tellus dapibus malesuada hendrerit, nibh nisl tristique turpis, eget placerat felis lectus vitae ipsum. Morbi viverra in justo elementum finibus. Sed mollis lorem tellus, rhoncus tristique tortor vulputate eget.`,
    `Curabitur at blandit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec lorem at ante pulvinar imperdiet nec iaculis ipsum. Mauris leo ipsum, euismod sed odio non, aliquam accumsan justo. Pellentesque ultricies bibendum ex, eget mattis massa sodales sit amet. Cras pharetra mauris eget pulvinar scelerisque. Aenean viverra, felis eu tristique maximus, dui ante convallis nunc, quis maximus metus eros a mauris. Curabitur tristique cursus rhoncus.`,
    `Donec magna nulla, ultricies vel mattis ac, aliquet a tortor. Ut sed egestas mauris. Suspendisse consectetur erat et ultricies auctor. In vulputate egestas metus nec mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean eu metus ac arcu scelerisque pharetra id id neque. Nam non turpis in lacus vulputate pulvinar. Phasellus dapibus, enim nec finibus rhoncus, ex erat posuere lorem, eu aliquam orci nulla eget diam. Nam sed molestie erat, congue tincidunt nisi. Fusce id ipsum leo. Nunc tellus metus, ultricies a volutpat aliquet, auctor nec nisl. Quisque ut consequat tortor.`,
    `Donec ut sodales turpis. Fusce id semper risus. Sed tempor aliquet est, sit amet tempor urna fermentum non. Maecenas quis velit scelerisque, faucibus ante molestie, sodales neque. Quisque vulputate tortor vel dui placerat, et tempor libero egestas. Morbi vehicula hendrerit consequat. Phasellus vitae mi a arcu eleifend bibendum. Duis dignissim elit porttitor nulla dignissim cursus. Donec non tortor nunc.`
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