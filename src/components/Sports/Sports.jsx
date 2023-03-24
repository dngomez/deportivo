import { useState } from "react"
import { motion } from "framer-motion"
import { SportButton } from "../SVG/SportButton"
import MoveButton from "../SVG/MoveButton"
import "./Sports.scss"

const sportDetails = {
  open: {
    clipPath: `circle(2200px at 0 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "circle(30px at 0 0)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const emptySpace = {
  open: { scale: 1, transition: { delay: 1.5 } },
  closed: { scale: 0 }
}

const hiddenText = {
  open: { opacity: 1, transition: { delay: 1.5 } },
  closed: { opacity: 0 }
}

const SPORT_TITLE = [
  { name: "Basketball", spName: "Basquetbol" },
  { name: "Soccer", spName: "Fútbol" },
  { name: "Rollerblade", spName: "Patines" },
  { name: "Baseball", spName: "Béisbol" },
  { name: "BoardGames", spName: "Juegos de mesa" },
  { name: "TableTenis", spName: "Ping Pong" },
  { name: "Paddle", spName: "Padel" },
  { name: "BabyFootball", spName: "Futbolito" },
  { name: "Tennis", spName: "Tenis" },
  { name: "Volleyball", spName: "Voleibol" },
  { name: "Billiard", spName: "Pool" },
  { name: "Cycling", spName: "Ciclismo" },
  { name: "Running", spName: "Atletismo" },
  { name: "Yoga", spName: "Yoga" },
  { name: "Dance", spName: "Baile" },
  { name: "MartialArts", spName: "Artes marciales" }
]

export default function Sports() {
  const [openSport, setOpenSport] = useState("")

  let sportButtons = []
  SPORT_TITLE.map((sport, index) => {
    sportButtons.push(
      <MoveButton key={index} openSport={openSport} setOpenSport={setOpenSport} sport={sport.name}>
        <SportButton sport={sport.name} openSport={openSport} />
      </MoveButton>
    )
  })

  return (
    <>
      <div className="sports-grid">
        {sportButtons}
      </div>
      <motion.div
        animate={(openSport === "") ? "closed" : "open"}
        variants={sportDetails}
        className="sport-details"
      >
      </motion.div>
      <motion.div
        animate={(openSport === "") ? "closed" : "open"}
        variants={sportDetails}
        className="sport-container"
      >
        <div className="details-container">
          <motion.div variants={emptySpace} className="empty-space" />
          <div className="title">
            <motion.h2 initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText}>{SPORT_TITLE.filter(s => s.name === openSport)[0]?.spName}</motion.h2>
            <motion.h4 initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText}>En construcción</motion.h4>
            <span
              className="button material-icons close-btn"
              onClick={() => setOpenSport("")}
            >close</span>
          </div>
          <div className="body">

          </div>
        </div>
      </motion.div>
    </>
  )
}

