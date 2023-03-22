import { useEffect, useState } from "react"
import { ImgHandler } from "../../Helpers/ImgHandler"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedCharacters from "../Logo/AnimatedText"
import "./Gallery.scss"

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "150%" : "-150%",
      y: "-50%",
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: "-50%",
    y: "-50%",
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "150%" : "-150%",
      y: "-50%",
      opacity: 0
    }
  }
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
}

export default function Gallery() {
  const [imgs, setImgs] = useState([])
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([(page + newDirection + imgs.length) % imgs.length, newDirection])
  }

  let paragraphs = [
    "Bienvenido",
    "Somos el Club Deportivo y Cultural Aura"
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

  useEffect(() => {
    ImgHandler.getAll()
    .then(res => setImgs(res.results))
  }, [])

  return (
    <div className="gallery">
      {showText}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={`https://drive.google.com/uc?export=view&id=${imgs[page]?.googleId}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </div>
  )
}