import React, { useRef } from "react";
import {
  Code,
  Database,
  Globe,
  Zap,
  Brain,
  Trophy,
  Star,
  Target,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SkillsProps {
  isDark: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isDark }) => {
  // Attach ref to a visible wrapper at the top of the section
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      color: "from-purple-500 to-indigo-600",
      skills: [
        { name: "React.js", level: 95, color: "from-blue-400 to-blue-600" },
        {
          name: "JavaScript",
          level: 90,
          color: "from-yellow-400 to-orange-500",
        },
        { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-blue-500" },
        {
          name: "Redux Toolkit",
          level: 85,
          color: "from-purple-400 to-purple-600",
        },
        { name: "HTML5/CSS3", level: 98, color: "from-orange-400 to-red-500" },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      color: "from-blue-500 to-cyan-600",
      skills: [
        { name: "Node.js", level: 90, color: "from-green-400 to-green-600" },
        { name: "Express.js", level: 88, color: "from-gray-400 to-gray-600" },
        { name: "MongoDB", level: 85, color: "from-green-500 to-emerald-600" },
        { name: "SQL", level: 87, color: "from-blue-500 to-indigo-600" },
        { name: "REST APIs", level: 92, color: "from-blue-400 to-indigo-600" },
        { name: "Socket.IO", level: 80, color: "from-purple-400 to-pink-500" },
      ],
    },
    {
      title: "Programming",
      icon: Code,
      color: "from-cyan-500 to-teal-600",
      skills: [
        { name: "C++", level: 95, color: "from-blue-500 to-indigo-600" },
        {
          name: "Cloudinary",
          level: 85,
          color: "from-blue-400 to-cyan-500",
        },
        {
          name: "Problem Solving",
          level: 98,
          color: "from-red-400 to-pink-600",
        },
        {
          name: "Data Structures",
          level: 95,
          color: "from-purple-400 to-indigo-600",
        },
        { name: "Algorithms", level: 92, color: "from-cyan-400 to-blue-500" },
      ],
    },
    {
      title: "Tools & Others",
      icon: Zap,
      color: "from-orange-500 to-red-600",
      description: "Git, Vercel, Postman, JWT, Generative AI, VS Code",
      skills: [
        { name: "Git/GitHub", level: 90, color: "from-gray-600 to-gray-800" },
        { name: "Vercel/Render", level: 85, color: "from-black to-gray-700" },
        { name: "Postman", level: 88, color: "from-orange-400 to-red-500" },
        { name: "JWT", level: 85, color: "from-green-400 to-teal-500" },
        {
          name: "Generative AI",
          level: 75,
          color: "from-purple-500 to-pink-600",
        },
        { name: "VS Code", level: 95, color: "from-indigo-500 to-blue-500" },
      ],
    },
  ];

  const competitiveProgramming = [
    {
      platform: "CodeChef",
      rating: "1602",
      color: "from-yellow-500 to-orange-500",
      icon: Trophy,
      rank: "3⭐",
      href: "https://www.codechef.com/users/gour_av",
    },
    {
      platform: "Codeforces",
      rating: "1147",
      color: "from-blue-500 to-indigo-500",
      icon: Target,
      rank: "Pupil",
      href: "https://codeforces.com/profile/gourav30",
    },
    {
      platform: "LeetCode",
      rating: "1657",
      color: "from-green-500 to-teal-500",
      icon: Brain,
      rank: "Guardian",
      href: "https://leetcode.com/u/gourav30/",
    },
    {
      platform: "HackerRank",
      rating: "5⭐",
      color: "from-purple-500 to-pink-500",
      icon: Star,
      rank: "Gold",
      href: "https://www.hackerrank.com/profile/gouravmondal30j1",
    },
    {
      platform: "GeeksforGeeks",
      rating: "Active",
      color: "from-green-600 to-teal-600",
      icon: Code,
      rank: "Contributor",
      href: "https://www.geeksforgeeks.org/user/gouravmondal30june2002/",
    },
  ];

  const pieColors = [
    "#6366F1",
    "#3B82F6",
    "#06B6D4",
    "#F59E42",
    "#EF4444",
    "#10B981",
    "#F472B6",
    "#FBBF24",
    "#A21CAF",
    "#F43F5E",
    "#22D3EE",
    "#FACC15",
    "#4ADE80",
    "#E879F9",
    "#F87171",
    "#0EA5E9",
    "#FDE68A",
    "#A3E635",
    "#F472B6",
    "#F59E42",
    "#6366F1",
    "#3B82F6",
    "#06B6D4",
    "#F59E42",
    "#EF4444",
  ];
  const pieData = {
    labels: skillCategories.flatMap((cat) =>
      cat.skills.map((skill) => skill.name)
    ),
    datasets: [
      {
        data: skillCategories.flatMap((cat) =>
          cat.skills.map((skill) => skill.level)
        ),
        backgroundColor: pieColors,
        borderWidth: 6,
        borderColor: "#fff",
        hoverOffset: 18,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 12,
        shadowColor: "rgba(80,80,180,0.18)",
      },
    ],
  };

  return (
    <section
      id="skills"
      className={`py-32 relative overflow-hidden ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          style={{ willChange: "transform, opacity" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        <div
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Attach ref to a visible wrapper at the top of the section */}
      <div ref={ref} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-12 -mt-8 sm:-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ willChange: "opacity, transform" }}
          className="text-center mb-20"
        >
          {/* Section Heading */}
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-2" />
        </motion.div>
        {/* Floating Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          className="w-full flex justify-center items-center mb-1"
          style={{ minHeight: 400 }}
        >
          <div className="w-full max-w-xl h-[400px] md:h-[500px] flex items-center justify-center">
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                },
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>
        {/* Skills as Gradient Pills/Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {skillCategories.flatMap((cat) =>
            cat.skills.map((skill, idx) => (
              <div
                key={cat.title + skill.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white shadow-md text-sm bg-gradient-to-r ${skill.color} cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
                style={{ minWidth: 90 }}
              >
                {skill.name}
              </div>
            ))
          )}
        </motion.div>
        {/* Explanatory text just below the skill pills */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
          className={`mt-6 text-lg text-center ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Each slice represents my proficiency in a technology or tool, making
          my strengths visually clear at a glance.
        </motion.p>
        {/* Gradient divider at the end of the Skills section */}
        <div className="relative z-10 mt-12 md:mt-16 flex justify-center">
          <div className="w-2/3 h-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-80" />
        </div>
      </div>

      {/* Competitive Programming Section */}
      <div className="container mx-auto px-6 relative z-10 -mt-8 sm:-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h3
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Competitive{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Programming
            </span>
          </h3>
          <div className="w-24 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeInOut" }}
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          I actively participate in coding contests and problem-solving on top
          platforms. Here are some of my profiles and achievements across the
          competitive programming world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 justify-center items-stretch"
        >
          {competitiveProgramming.map((platform, idx) => (
            <a
              key={platform.platform}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
              aria-label={`View ${platform.platform} profile`}
              className={`relative flex flex-col items-center justify-between p-5 rounded-2xl transition-all duration-300 group cursor-pointer overflow-hidden shadow-2xl border backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-pink-400
                  ${
                    isDark
                      ? "bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-purple-900/60 border-purple-500/30 hover:shadow-[0_8px_32px_0_rgba(126,34,206,0.3)]"
                      : "bg-gradient-to-br from-white/80 via-blue-50/80 to-pink-50/80 border-blue-200/50 hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.25)]"
                  }
                  min-h-[220px]`}
              style={{ minHeight: 220 }}
            >
              {/* Background Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 transition-opacity duration-500 pointer-events-none`}
              />
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center w-full flex-1 justify-between text-center">
                <h4
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {platform.platform}
                </h4>
                <p
                  className={`text-2xl font-black bg-gradient-to-r ${platform.color} bg-clip-text text-transparent mb-2`}
                >
                  {platform.rating}
                </p>
                {/* Platform Description */}
                <p
                  className={`text-sm mb-4 text-center ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {platform.platform === "CodeChef"
                    ? "3-star coder, 1602 rating, regular contest participant."
                    : platform.platform === "Codeforces"
                    ? "Newbie, 1147 rating, active in global rounds."
                    : platform.platform === "LeetCode"
                    ? "340+ problems solved across various DSA topics."
                    : platform.platform === "HackerRank"
                    ? "5-star in Problem Solving and Language Proficiency."
                    : platform.platform === "GeeksforGeeks"
                    ? "90+ problems solved, active problem solver."
                    : ""}
                </p>
                <button
                  type="button"
                  className="mt-6 px-5 py-2 rounded-full font-semibold flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 mx-auto"
                  aria-label={`Go to ${platform.platform} profile`}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(platform.href, "_blank", "noopener,noreferrer");
                  }}
                >
                  View Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
