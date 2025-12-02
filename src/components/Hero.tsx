import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Sparkles,
  Code,
  Zap,
  Target,
  Trophy,
  ChefHat,
  Brain,
  Star,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroProps {
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDark }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollY } = useScroll();

  // Fix: Store marquee width in state to avoid SSR/hydration issues
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  useEffect(() => {
    // Only run on client
    setMarqueeWidth(window.innerWidth);
    const handleResize = () => setMarqueeWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reduced parallax effect to keep content visible
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.8]);

  const texts = [
    "Full Stack Developer",
    "Competitive Programmer",
    "Generative AI Enthusiast",
  ];

  useEffect(() => {
    const text = texts[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === text) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        setCurrentText((prev) =>
          isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting]);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Gourav123-sys",
      label: "GitHub",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gourav-mondal-55a812204",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Mail,
      href: "mailto:gourav.mondal.bits@gmail.com",
      label: "Email",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Phone,
      href: "tel:+917717773895",
      label: "Phone",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: ExternalLink,
      href: "https://leetcode.com/u/gourav30/",
      label: "LeetCode",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: ExternalLink,
      href: "https://www.codechef.com/users/gour_av",
      label: "CodeChef",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: ExternalLink,
      href: "https://codeforces.com/profile/gourav30",
      label: "Codeforces",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: ExternalLink,
      href: "https://www.hackerrank.com/profile/gouravmondal30j1",
      label: "HackerRank",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: ExternalLink,
      href: "https://www.geeksforgeeks.org/user/gouravmondal30june2002/",
      label: "GeeksforGeeks",
      color: "from-green-600 to-teal-600",
    },
  ];

  const floatingElements = [
    { icon: Code, delay: 0, x: 100, y: 100 },
    { icon: Zap, delay: 0.5, x: -100, y: 150 },
    { icon: Sparkles, delay: 1, x: 150, y: -100 },
    { icon: Target, delay: 1.5, x: -150, y: -120 },
    { icon: Trophy, delay: 2, x: 120, y: -150 },
  ];

  const allLinks = [...socialLinks];

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4 sm:px-6 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 rounded-full blur-3xl"
        />

        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              x: [element.x, element.x + 50, element.x],
              y: [element.y, element.y - 30, element.y],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
            className={`absolute ${
              isDark ? "text-purple-400" : "text-blue-500"
            }`}
            style={{ left: `50%`, top: `50%` }}
          >
            <element.icon size={20} className="sm:w-6 sm:h-6" />
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              duration: 1,
            }}
            className="mb-6 sm:mb-8 relative"
          >
            <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
              {/* Animated Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-1"
              >
                <div
                  className={`w-full h-full rounded-full ${
                    isDark ? "bg-gray-900" : "bg-white"
                  }`}
                />
              </motion.div>

              {/* Profile Content */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-2xl">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.5)",
                      "0 0 40px rgba(59, 130, 246, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  GM
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Hi, I'm{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Gourav
            </motion.span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <p
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I'm a{" "}
              <span className="relative">
                <motion.span
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold"
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentText}
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 text-purple-500"
                >
                  |
                </motion.span>
              </span>
            </p>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: "easeInOut" }}
            className="mb-6 sm:mb-8"
          >
            <div
              className={`max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl ${
                isDark
                  ? "bg-gray-800/30 backdrop-blur-xl border border-purple-500/20"
                  : "bg-white/30 backdrop-blur-xl border border-blue-200/50"
              } shadow-2xl`}
            >
              <h2
                className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                🚀 Seeking{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  SDE Internships
                </span>
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Versatile Full Stack Developer with expertise in the{" "}
                <span className="text-purple-500 font-semibold">
                  MERN stack
                </span>{" "}
                and hands-on experience in{" "}
                <span className="text-blue-500 font-semibold">
                  Generative AI
                </span>
                . Specializing in building scalable, real-time, and user-centric
                web applications with{" "}
                <span className="text-cyan-500 font-semibold">
                  secure authentication
                </span>
                ,{" "}
                <span className="text-green-500 font-semibold">
                  responsive design
                </span>
                , and{" "}
                <span className="text-teal-500 font-semibold">robust APIs</span>
                . Strong in{" "}
                <span className="text-orange-500 font-semibold">
                  problem-solving
                </span>
                ,{" "}
                <span className="text-pink-500 font-semibold">
                  collaborative teamwork
                </span>
                , and delivering{" "}
                <span className="text-indigo-500 font-semibold">
                  production-ready solutions
                </span>{" "}
                under tight deadlines. Actively seeking SDE internships to
                contribute to impactful software systems.
              </p>
            </div>
          </motion.div>

          {/* Social Media Marquee (responsive) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full overflow-x-hidden py-4 mb-8 sm:mb-12"
          >
            <motion.div
              className="flex items-center gap-4 sm:gap-8"
              animate={{ x: [0, -marqueeWidth] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: 12,
              }}
              style={{ minWidth: "200vw" }}
            >
              {[...socialLinks, ...socialLinks].map((link, idx) => (
                <a
                  key={link.href + idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center px-3 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-br ${link.color} shadow-lg transition-all duration-100 hover:scale-110 hover:shadow-2xl border border-white/10 min-w-[80px] sm:min-w-[120px] max-w-[100px] sm:max-w-[140px] w-[80px] sm:w-[120px]`}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {typeof link.icon === "string" ? (
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="mb-1 sm:mb-2"
                      style={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <link.icon
                      size={24}
                      className="mb-1 sm:mb-2 text-white transition-all duration-75 group-hover:scale-125"
                    />
                  )}
                  <span className="text-white font-semibold text-xs sm:text-sm tracking-wide truncate w-full text-center">
                    {link.label}
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Buttons (responsive) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 w-full max-w-2xl mx-auto"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative flex-1 min-w-[200px] sm:min-w-[220px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-semibold shadow-2xl overflow-hidden transition-all duration-200 border-2 border-transparent hover:border-purple-400 text-sm sm:text-base"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Mail size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">
                  Hire Me for SDE Internship
                </span>
                <span className="sm:hidden">Hire Me</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                </motion.div>
              </span>
            </motion.button>
            {/* Download Resume Button (functional) */}
            <a
              href="/Gourav_Mondal_Resume.pdf"
              download
              className={`group flex-1 min-w-[200px] sm:min-w-[220px] px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-500/10 flex items-center justify-center gap-2 text-sm sm:text-base`}
              style={{ textDecoration: "none" }}
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Download Resume</span>
              <span className="sm:hidden">Resume</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
