import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pendingScrollTarget = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "achievements",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll after menu closes
  useEffect(() => {
    if (!isMenuOpen && pendingScrollTarget.current) {
      setTimeout(() => {
        scrollToSection(pendingScrollTarget.current!);
        pendingScrollTarget.current = null;
      }, 10); // minimal delay to ensure DOM is stable
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update the URL hash for better browser support
      if (window.location.hash !== href) {
        window.history.replaceState(null, "", href);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10"
              : "bg-white/95 backdrop-blur-xl border-b border-blue-200/50 shadow-2xl shadow-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code2 className="text-white" size={24} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl blur opacity-30 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Gourav Mondal
                </span>
                <span
                  className={`text-sm font-medium flex items-center gap-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Full Stack Developer
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? isDark
                        ? "text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30"
                        : "text-gray-900 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-300/30"
                      : isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl border border-purple-500/20"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </a>
              ))}

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`ml-4 p-3 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                } transition-all duration-300`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDark
                    ? "bg-gray-800 text-purple-400"
                    : "bg-gray-100 text-blue-600"
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden mt-4 py-4 px-4 rounded-2xl ${
                  isDark
                    ? "bg-gray-800/90 backdrop-blur-xl border border-purple-500/20"
                    : "bg-white/90 backdrop-blur-xl border border-blue-200/50"
                } shadow-2xl`}
              >
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      pendingScrollTarget.current = item.href;
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl mb-2 font-medium transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? isDark
                          ? "text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                          : "text-gray-900 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                        : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 z-50 origin-left shadow-lg"
        style={{
          scaleX: scrolled ? 1 : 0,
          willChange: "transform",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </>
  );
};

export default Header;
