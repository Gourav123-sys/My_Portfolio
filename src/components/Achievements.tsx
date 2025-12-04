import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Award, Star, Zap, Code } from "lucide-react";

interface AchievementsProps {
  isDark: boolean;
}

const Achievements: React.FC<AchievementsProps> = ({ isDark }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      label: "LeetCode",
      value: "340+",
      description: "Problems Solved",
      icon: Code,
      color: "from-green-400 to-emerald-600",
    },
    {
      label: "CodeChef",
      value: "1602",
      description: "Current Rating",
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Codeforces",
      value: "1147",
      description: "Max Rating",
      icon: Zap,
      color: "from-blue-400 to-indigo-600",
    },
    {
      label: "HackerRank",
      value: "5⭐",
      description: "Rating",
      icon: Star,
      color: "from-purple-400 to-pink-600",
    },
  ];

  return (
    <section
      id="achievements"
      className={`py-16 sm:py-24 md:py-32 relative overflow-hidden px-4 sm:px-6 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-white via-gray-50 to-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ willChange: "opacity, transform" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Achievements &{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <motion.div
            className="w-24 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
              }}
              whileHover={{ scale: 1.03 }}
              className={`text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl ${
                isDark
                  ? "bg-gray-800/50 backdrop-blur-xl border border-purple-500/20"
                  : "bg-white/80 backdrop-blur-xl border border-blue-200/50"
              } shadow-2xl group cursor-pointer relative overflow-hidden`}
            >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-500`}
                initial={{ scale: 0, rotate: 45 }}
                transition={{ duration: 0.6 }}
              />

              {/* Icon */}
              <div
                className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${stat.color} mb-3 sm:mb-4 shadow-2xl relative z-10`}
              >
                <stat.icon className="text-white sm:w-8 sm:h-8" size={24} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div
                  className={`text-sm sm:text-lg md:text-xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.label}
                </div>
                <div
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.description}
                </div>
                {/* More descriptive subtext for each stat */}
                <div
                  className={`text-xs mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {stat.label === "LeetCode" &&
                    "Focused on algorithms, data structures, and daily challenges."}
                  {stat.label === "CodeChef" &&
                    "Consistent performer in rated contests and long challenges."}
                  {stat.label === "Codeforces" &&
                    "Active in global rounds, improving problem-solving speed."}
                  {stat.label === "HackerRank" &&
                    "Strong in algorithms, data structures, and certifications."}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h3
            className={`text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Professional{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h3>

          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: isDark
                ? "0 30px 60px rgba(147, 51, 234, 0.4)"
                : "0 30px 60px rgba(59, 130, 246, 0.4)",
            }}
            className={`max-w-4xl mx-auto p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl ${
              isDark
                ? "bg-gray-800/50 backdrop-blur-xl border border-purple-500/20"
                : "bg-white/80 backdrop-blur-xl border border-blue-200/50"
            } shadow-2xl relative overflow-hidden group cursor-pointer`}
          >
            {/* Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative z-10">
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 1 }}
                className="p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg sm:shadow-xl md:shadow-2xl"
              >
                <Award className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <h4
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Full Stack Web Development with MERN Stack & Generative AI
                </h4>
                <p
                  className={`text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Comprehensive certification covering modern web development
                  technologies, advanced React patterns, Node.js architecture,
                  and cutting-edge AI integration techniques.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-md sm:shadow-lg"
                >
                  <a
                    href="https://www.udemy.com/certificate/UC-a6f2d4e9-2811-4fa4-9345-a61b9847d1f7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/90 transition-colors flex items-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://www.udemy.com/certificate/UC-a6f2d4e9-2811-4fa4-9345-a61b9847d1f7/",
                        "_blank"
                      );
                    }}
                  >
                    <span>Udemy Certified</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
