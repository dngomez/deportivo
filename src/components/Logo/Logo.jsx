import React from "react";
import { motion } from "framer-motion";
import AnimatedCharacters from "./AnimatedText";
import "./Logo.scss"

export default function Logo() {
  let logoText = "Club Deportivo y Cultural AURA"

  return (
    <div className="logo">
      <div className="text">
        <AnimatedCharacters text={logoText} />
      </div>
      <div className="svg-container">
        <svg width="250" height="300" viewBox="0 0 230 300">
          <motion.path
            d="M 50 150 L 100 100 L 150 150 L 200 100 M 100 180 L 150 230 L 100 280 M 70 230 L 20 280"
            fill="transparent"
            strokeWidth="30"
            strokeLinejoin="round"
            stroke="var(--accent)"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 2.2 }}
          />
          <motion.circle
            cx="150"
            cy="50"
            r="35"
            fill="var(--accent)"
            strokeWidth="0"
            strokeLinecap="round"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 2.2 }}
          />
        </svg>
      </div>
    </div>
  );
}
