import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Database,
  Globe,
  Zap,
  Brain,
  Rocket,
  Target,
  Award,
} from "lucide-react";

interface AboutProps {
  isDark: boolean;
}

const About: React.FC<AboutProps> = ({ isDark }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const highlights = [
    {
      icon: Code,
      title: "Full Stack Mastery",
      description:
        "Expert in MERN stack with modern frameworks and cutting-edge tools",
      color: "from-purple-500 to-indigo-600",
      delay: 0.1,
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description:
        "Scalable APIs, real-time features, and bulletproof security",
      color: "from-blue-500 to-cyan-600",
      delay: 0.2,
    },
    {
      icon: Globe,
      title: "Frontend Excellence",
      description: "Pixel-perfect, responsive UIs with stunning animations",
      color: "from-cyan-500 to-teal-600",
      delay: 0.3,
    },
    {
      icon: Zap,
      title: "Competitive Edge",
      description: "Elite problem-solving with 500+ challenges conquered",
      color: "from-orange-500 to-red-600",
      delay: 0.4,
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Problems Solved",
      icon: Target,
      description:
        "Solved 500+ coding problems across platforms like LeetCode, CodeChef, and Codeforces. Strong analytical and problem-solving skills honed through regular practice and contests.",
    },
    {
      number: "10+",
      label: "Projects Built",
      icon: Rocket,
      description:
        "Developed 10+ full-stack, frontend, and backend projects using React, Node.js, Express, and MongoDB. Passionate about building real-world, scalable solutions and learning by doing.",
    },
    {
      number: "1602",
      label: "CodeChef Rating",
      icon: Award,
      description:
        "Achieved a peak CodeChef rating of 1602. Consistent performer in national-level coding contests and a dedicated competitive programmer.",
    },
    {
      number: "2+",
      label: "Years Experience",
      icon: Brain,
      description:
        "Over 2 years of self-driven learning, project building, and hands-on experience. For more, see my resume.",
      resume: true,
    },
  ];

  return (
    <section
      id="about"
      className={`py-16 sm:py-24 md:py-32 relative overflow-hidden px-4 sm:px-6 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl" />
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
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <motion.div
            className="w-24 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: isDark
                  ? "0 20px 40px rgba(147, 51, 234, 0.3)"
                  : "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              className={`text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl ${
                isDark
                  ? "bg-gray-800/50 backdrop-blur-xl border border-purple-500/20"
                  : "bg-white/80 backdrop-blur-xl border border-blue-200/50"
              } shadow-2xl group cursor-pointer`}
            >
              <div className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                <stat.icon className="text-white sm:w-8 sm:h-8" size={24} />
              </div>
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div
                className={`font-semibold text-sm sm:text-base ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-1`}
              >
                {stat.label}
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
                {stat.resume && (
                  <>
                    {" "}
                    <a
                      href="/Gourav_Mondal_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline ml-1"
                    >
                      (View Resume)
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            <div
              className={`text-base sm:text-lg md:text-xl leading-relaxed space-y-4 sm:space-y-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                I'm a passionate{" "}
                <span className="text-purple-500 font-bold">
                  Full Stack Developer
                </span>{" "}
                currently pursuing B.Tech in Electronics and Communication
                Engineering at{" "}
                <span className="text-blue-500 font-semibold">
                  Birsa Institute of Technology, Sindri
                </span>
                . With expertise in the MERN stack and hands-on experience in
                Generative AI, I specialize in creating scalable, real-time, and
                user-centric web applications.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                My journey in{" "}
                <span className="text-cyan-500 font-bold">
                  competitive programming
                </span>{" "}
                has sharpened my problem-solving abilities, with notable
                achievements including a{" "}
                <span className="text-orange-500 font-bold">
                  2nd rank at ICPC 2023
                </span>{" "}
                (among teams from my college) Amritapuri Prelims and qualifying
                for prestigious contests like Meta Hacker Cup 2023.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                I thrive on building{" "}
                <span className="text-teal-500 font-bold">
                  production-ready solutions
                </span>{" "}
                that combine technical excellence with intuitive user
                experiences. Whether it's developing real-time chat
                applications, financial visualizers, or complex web platforms, I
                bring creativity and technical expertise to every project.
              </motion.p>
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{
                scale: 1.02,
                boxShadow: isDark
                  ? "0 25px 50px rgba(147, 51, 234, 0.3)"
                  : "0 25px 50px rgba(59, 130, 246, 0.3)",
              }}
              className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl ${
                isDark
                  ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-xl border border-purple-500/20"
                  : "bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl border border-blue-200/50"
              } shadow-2xl group cursor-pointer`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 group-hover:shadow-lg group-hover:shadow-purple-500/25 self-start">
                  <Award className="text-white sm:w-6 sm:h-6" size={20} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    B.Tech, Electronics and Communication Engineering
                  </h3>
                  <p className="text-purple-500 font-bold text-base sm:text-lg mb-2">
                    Birsa Institute of Technology, Sindri
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <p
                      className={`text-sm sm:text-base ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Nov 2022 – May 2026
                    </p>
                    <div className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm sm:text-base self-start sm:self-auto">
                      CGPA: 7.75/10
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: isDark
                    ? "0 20px 40px rgba(147, 51, 234, 0.3)"
                    : "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl ${
                  isDark
                    ? "bg-gray-800/50 backdrop-blur-xl border border-purple-500/20"
                    : "bg-white/80 backdrop-blur-xl border border-blue-200/50"
                } shadow-2xl group cursor-pointer overflow-hidden relative`}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-100`}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.1 }}
                />
                <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 relative z-10">
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${highlight.color} group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-100 self-start`}
                  >
                    <highlight.icon
                      className="text-white sm:w-8 sm:h-8"
                      size={24}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 ${
                        isDark ? "text-white" : "text-gray-900"
                      } transition-all duration-100`}
                    >
                      {highlight.title}
                    </h4>
                    <p
                      className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      } transition-all duration-100`}
                    >
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
