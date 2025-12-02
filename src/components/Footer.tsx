import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Github,
  Linkedin,
  Mail,
  Code,
  ArrowUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
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
  ];

  const codingLinks = [
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

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative overflow-hidden px-4 sm:px-6 ${
        isDark
          ? "bg-gray-900 border-t border-purple-500/20"
          : "bg-gradient-to-br from-white via-gray-50 to-white border-t border-blue-200/50"
      }`}
    >
      {/* Gradient Divider */}
      <div className="w-full h-1 sm:h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mb-6 sm:mb-8 opacity-80" />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto py-8 sm:py-12 relative z-10">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 sm:gap-12 text-center lg:text-left">
          {/* Brand & Social */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-4 sm:gap-6">
            {/* Brand Section */}
            <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 shadow-2xl">
                <Code className="text-white sm:w-7 sm:h-7" size={24} />
              </div>
              <div>
                <span
                  className={`text-xl sm:text-2xl font-black ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Gourav Mondal
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles
                    className="text-purple-500 sm:w-4 sm:h-4"
                    size={14}
                  />
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Full Stack Developer
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } leading-relaxed text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm`}
            >
              Passionate about creating innovative solutions and solving complex
              problems. Let's build something amazing together!
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-2">
              {[...socialLinks, ...codingLinks].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br ${link.color} shadow-lg transition-all duration-100 hover:scale-110 hover:shadow-2xl`}
                  style={{ minWidth: 50 }}
                >
                  <link.icon
                    size={18}
                    className="mb-1 text-white transition-all duration-75 group-hover:scale-125 sm:w-5 sm:h-5"
                  />
                  <span className="text-white font-semibold text-xs whitespace-nowrap">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 flex flex-col items-center gap-3 sm:gap-4">
            <h3
              className={`text-lg sm:text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-all duration-100 text-sm sm:text-base md:text-lg font-medium flex items-center gap-2 group ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full group-hover:scale-125 transition-transform duration-100" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col items-center lg:items-end gap-3 sm:gap-4">
            <h3
              className={`text-lg sm:text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Contact
            </h3>
            <div className="flex flex-col gap-1 sm:gap-2 items-center lg:items-end">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-purple-500 sm:w-4 sm:h-4" />
                <span className="font-medium text-sm sm:text-base">
                  gourav.mondal.bits@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📱</span>
                <span className="font-medium text-sm sm:text-base">
                  +91-7717773895
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📍</span>
                <span className="font-medium text-sm sm:text-base">
                  Sindri, Jharkhand, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-dashed border-purple-400 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center">
          <span
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } flex items-center gap-2 text-sm sm:text-base md:text-lg`}
          >
            Made with{" "}
            <Heart
              className="text-red-500 sm:w-5 sm:h-5"
              size={16}
              fill="currentColor"
            />{" "}
            and <Code className="text-purple-500 sm:w-5 sm:h-5" size={16} /> by
            Gourav Mondal
          </span>
          <span
            className={`${
              isDark ? "text-gray-400" : "text-gray-600"
            } text-xs sm:text-sm`}
          >
            © {new Date().getFullYear()} All rights reserved.
          </span>
          <motion.button
            onClick={scrollToTop}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transition-all duration-100 hover:scale-110"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={16} className="sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
