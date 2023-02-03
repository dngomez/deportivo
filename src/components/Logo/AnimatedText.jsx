import React from "react"
import { motion } from "framer-motion"

export default function AnimatedCharacters({ text }) {
  //  Split each word of props.text into an array
  const splitWords = text.split(" ")

  // Create storage array
  const words = []

  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""))
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0");
  });

  return (
    <span className="logo-text">
      {words.flat().map((element, index) => {
        return (
          <motion.span
            key={index}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 * index + 1 }}
          >
            {element}
          </motion.span>
        )
      })}
    </span>
  );
}
