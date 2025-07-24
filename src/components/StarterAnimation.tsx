import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const phoneVariants = {
  initial: { rotate: -20, scale: 0.8, y: 0 },
  animate: {
    rotate: [0, 20, -20, 0],
    scale: [0.8, 1, 1, 0.8],
    y: [0, -10, 10, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 60, scale: 0.8, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: [60, -30, 0],
    scale: [0.8, 1.1, 1],
    filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
    textShadow: [
      "0 8px 32px rgba(139,92,246,0.5)",
      "0 16px 48px rgba(59,130,246,0.5)",
      "0 4px 16px rgba(6,182,212,0.5)",
    ],
    transition: {
      duration: 1.6,
      ease: "easeOut",
    },
  },
};

const dotVariants = {
  animate: (i: number) => ({
    y: [0, -14, 0],
    scale: [1, 1.2, 1],
    boxShadow: [
      "0 0 0px #fff, 0 0 0px #fff",
      "0 0 8px #fff, 0 0 16px #fff",
      "0 0 0px #fff, 0 0 0px #fff",
    ],
    transition: {
      duration: 0.9,
      repeat: Infinity,
      delay: i * 0.18,
      ease: "easeInOut",
    },
  }),
};

const sparkles = [
  { top: 30, left: 40, size: 18, delay: 0 },
  { top: 80, left: 150, size: 14, delay: 0.5 },
  { top: 250, left: 60, size: 12, delay: 1 },
  { top: 200, left: 120, size: 16, delay: 1.3 },
];

const StarterAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-600">
      <motion.div
        className="relative flex items-center justify-center"
        variants={phoneVariants}
        initial="initial"
        animate="animate"
        style={{ width: 200, height: 400 }}
      >
        {/* Glowing border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow:
              "0 0 40px 10px rgba(139,92,246,0.5), 0 0 80px 20px rgba(59,130,246,0.3)",
            zIndex: 1,
          }}
          animate={{
            boxShadow: [
              "0 0 40px 10px rgba(139,92,246,0.5), 0 0 80px 20px rgba(59,130,246,0.3)",
              "0 0 60px 20px rgba(139,92,246,0.7), 0 0 100px 30px rgba(6,182,212,0.4)",
              "0 0 40px 10px rgba(139,92,246,0.5), 0 0 80px 20px rgba(59,130,246,0.3)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Sparkles */}
        {sparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: s.top, left: s.left, zIndex: 2 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.7, 1.2, 0.7] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={s.size} className="text-cyan-200 drop-shadow-lg" />
          </motion.div>
        ))}
        {/* Phone body */}
        <motion.div
          className="rounded-3xl bg-gray-900 shadow-2xl border-4 border-white/20 flex flex-col items-center justify-center relative overflow-visible"
          style={{ width: 200, height: 400, zIndex: 3, perspective: 800 }}
        >
          {/* Speaker */}
          <div className="w-16 h-1.5 bg-gray-700 rounded-full mt-4 mb-2 mx-auto" />
          {/* 3D Text popping out */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-full flex flex-col items-center"
            style={{
              transform:
                "translate(-50%, -60%) perspective(600px) rotateX(18deg)",
              zIndex: 10,
            }}
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <span
              className="block text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                textShadow:
                  "0 8px 32px rgba(139,92,246,0.5), 0 16px 48px rgba(59,130,246,0.5), 0 4px 16px rgba(6,182,212,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Gourav Mondal
            </span>
          </motion.div>
          {/* Screen */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 flex items-center justify-center mt-2 shadow-lg"
            style={{ width: 170, height: 320, marginTop: 60 }}
            initial={{ boxShadow: "0 0 0px #fff" }}
            animate={{
              boxShadow: [
                "0 0 0px #fff",
                "0 0 24px #8b5cf6, 0 0 48px #06b6d4",
                "0 0 0px #fff",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                />
              ))}
            </div>
          </motion.div>
          {/* Home button */}
          <div className="w-8 h-1.5 bg-gray-700 rounded-full mt-4 mb-2 mx-auto" />
        </motion.div>
      </motion.div>
      <div className="mt-10 text-white text-lg font-semibold tracking-wide drop-shadow-lg animate-pulse">
        Loading Portfolio...
      </div>
    </div>
  );
};

export default StarterAnimation;
