import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SportButton } from "../SVG/SportButton"
import MoveButton from "../SVG/MoveButton"
import { SportHandler } from "../../Helpers/SportHandler"
import { UserHandler } from "../../Helpers/UserHandler"
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

export default function Sports() {
  const [openSport, setOpenSport] = useState("")
  const [sports, setSports] = useState([])
  const [coordinator, setCoordinator] = useState(undefined)

  useEffect(() => {
    SportHandler.getAll()
    .then(res => setSports(res.results))
  }, [])

  useEffect(() => {
    if (Boolean(openSport)) {
      if ("userId" in sports.filter(s => s.name === openSport)[0].coordinator) {
        UserHandler.getCoordinator(sports.filter(s => s.name === openSport)[0].coordinator.userId)
        .then(res => setCoordinator(res.result))
      } else {
        setCoordinator(sports.filter(s => s.name === openSport)[0].coordinator)
      }
    } else {
      setCoordinator(undefined)
    }
  }, [openSport])

  let sportButtons = []
  sports.map((sport, index) => {
    sportButtons.push(
      <MoveButton key={index} openSport={openSport} setOpenSport={setOpenSport} sport={sport.name}>
        <SportButton sport={sport} openSport={openSport} />
      </MoveButton>
    )
  })

  let selectedSport = sports.filter(s => s.name === openSport)[0]
  let descriptionPars = []
  if (selectedSport?.description) {
    descriptionPars.push(
      <h3 key="descriptionTitle">Descripción:</h3>
    )
    selectedSport?.description.split('\n').map((par, idx) => {
      descriptionPars.push(
        <p className="description-par" key={`par_${idx}`}>{par}</p>
      )
    })
  }

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
          <motion.div initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText} className="title">
            <h2>{selectedSport?.spName}</h2>
            <span>Encargado de la rama:</span>
            <span>{coordinator?.name}</span>
            <a href={`mailto:${coordinator?.email}`}>{coordinator?.email}</a>
            <span
              className="button material-icons close-btn"
              onClick={() => setOpenSport("")}
            >close</span>
          </motion.div>
          <motion.div initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText} className="body">
            {descriptionPars}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

