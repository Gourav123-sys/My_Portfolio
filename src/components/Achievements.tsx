import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Target,
  Users,
  Crown,
  Zap,
  Code,
} from "lucide-react";

interface AchievementsProps {
  isDark: boolean;
}

const Achievements: React.FC<AchievementsProps> = ({ isDark }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const achievements = [
    {
      icon: Trophy,
      title: "2nd Rank - ICPC 2023 Amritapuri Prelims",
      description:
        "Secured 2nd position representing BIT Sindri team in the prestigious ICPC programming contest",
      color: "from-yellow-400 via-orange-500 to-red-500",
      year: "2023",
      category: "Competition",
    },
    {
      icon: Crown,
      title: "Top 30 Teams - Smart India Hackathon 2024",
      description:
        "Stood among top 30 teams(in college) in Smart India Hackathon for innovative solution development",
      color: "from-blue-400 via-indigo-500 to-purple-600",
      year: "2024",
      category: "Hackathon",
    },
    {
      icon: Medal,
      title: "Meta Hacker Cup 2023 - Round 1 Qualified",
      description:
        "Successfully qualified for Round 1 of Meta Hacker Cup, competing against global programmers",
      color: "from-purple-400 via-pink-500 to-red-500",
      year: "2023",
      category: "Global Contest",
    },
    {
      icon: Award,
      title: "CodeVita 2025 - Round 1 Qualified",
      description:
        "Qualified for Round 1 of TCS CodeVita, one of the largest programming contests",
      color: "from-green-400 via-teal-500 to-cyan-600",
      year: "2025",
      category: "Programming",
    },
    {
      icon: Target,
      title: "500+ Problems Solved",
      description:
        "Achieved milestone of solving 500+ competitive programming problems across platforms",
      color: "from-red-400 via-pink-500 to-purple-600",
      year: "2024",
      category: "Milestone",
    },
    {
      icon: Users,
      title: "Problem Setter - BIT CODE",
      description:
        "Active problem setter for monthly coding contests at BIT Sindri",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      year: "Ongoing",
      category: "Leadership",
    },
  ];

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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

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
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                boxShadow: isDark
                  ? "0 25px 50px rgba(147, 51, 234, 0.4)"
                  : "0 25px 50px rgba(59, 130, 246, 0.4)",
              }}
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
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.8 }}
                className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${stat.color} mb-3 sm:mb-4 shadow-2xl relative z-10`}
              >
                <stat.icon className="text-white sm:w-8 sm:h-8" size={24} />
              </motion.div>

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

              {/* Floating Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100`}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  style={{
                    left: `${15 + i * 20}%`,
                    top: "15%",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Carousel (Marquee, like Hero section) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="w-full max-w-5xl overflow-x-hidden py-2">
            <motion.div
              className="flex items-center gap-4 sm:gap-6 md:gap-8"
              animate={{ x: [0, -1600] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: [0.42, 0, 0.58, 1], // easeInOut
                duration: 48,
              }}
              style={{ minWidth: "200vw" }}
            >
              {[...achievements, ...achievements].map((ach, idx) => (
                <div
                  key={ach.title + idx}
                  className={`flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${ach.color} shadow-2xl min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[300px] sm:max-w-[350px] md:max-w-[370px] mx-auto transition-all duration-300 group cursor-pointer relative overflow-hidden min-h-[320px] sm:min-h-[360px] md:min-h-[400px]`}
                  style={{ marginRight: 16 }}
                >
                  <ach.icon
                    size={40}
                    className="mb-3 sm:mb-4 md:mb-5 text-white drop-shadow-lg flex-shrink-0 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 text-center break-words w-full leading-tight px-2">
                    {ach.title}
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 mb-2 sm:mb-3 text-center break-words w-full leading-relaxed px-2 flex-1">
                    {ach.description}
                  </p>
                  {/* Additional context */}
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 text-center break-words w-full leading-relaxed px-2">
                    {ach.title.includes("ICPC") &&
                      "International collegiate contest, teamwork and algorithmic excellence."}
                    {ach.title.includes("Smart India Hackathon") &&
                      "National innovation event, real-world problem solving."}
                    {ach.title.includes("Meta Hacker Cup") &&
                      "Global Facebook contest, advanced algorithms."}
                    {ach.title.includes("CodeVita") &&
                      "TCS global contest, coding under pressure."}
                    {ach.title.includes("Problems Solved") &&
                      "Milestone in competitive programming journey."}
                    {ach.title.includes("Problem Setter") &&
                      "Leadership and contribution to coding community."}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-auto">
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold">
                      {ach.year}
                    </span>
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold">
                      {ach.category}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
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
