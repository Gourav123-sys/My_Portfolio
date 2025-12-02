import React from "react";
import { motion } from "framer-motion";

const phoneVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const dotVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
  },
};

const StarterAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-600">
      <motion.div
        className="relative flex items-center justify-center"
        variants={phoneVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: 200, height: 400 }}
      >
        {/* Phone body */}
        <div
          className="rounded-3xl bg-gray-900 shadow-2xl border-4 border-white/20 flex flex-col items-center justify-center relative"
          style={{ width: 200, height: 400 }}
        >
          {/* Speaker */}
          <div className="w-16 h-1.5 bg-gray-700 rounded-full mt-4 mb-2 mx-auto" />
          {/* Text */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-full flex flex-col items-center"
            style={{ transform: "translate(-50%, -60%)" }}
            variants={textVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Gourav Mondal
            </span>
          </motion.div>
          {/* Screen */}
          <div
            className="rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 flex items-center justify-center mt-2 shadow-lg"
            style={{ width: 170, height: 320, marginTop: 60 }}
          >
            {/* Loading dots */}
            <div
              className="flex gap-2 items-end absolute bottom-8 left-1/2"
              style={{ transform: "translateX(-50%)" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === 0
                      ? "bg-white"
                      : i === 1
                      ? "bg-white/80"
                      : "bg-white/60"
                  }`}
                  variants={dotVariants}
                  animate="animate"
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
          {/* Home button */}
          <div className="w-8 h-1.5 bg-gray-700 rounded-full mt-4 mb-2 mx-auto" />
        </div>
      </motion.div>
      <div className="mt-10 text-white text-lg font-semibold tracking-wide drop-shadow-lg animate-pulse">
        Loading Portfolio...
      </div>
    </div>
  );
};

export default StarterAnimation;
