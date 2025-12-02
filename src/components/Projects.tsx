import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  DollarSign,
  Car,
  Globe,
  Zap,
  Users,
  Music,
  ShoppingCart,
  Phone,
  Sun,
} from "lucide-react";

interface ProjectsProps {
  isDark: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDark }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: "Talksy - Real-Time Group Chat Platform (Full-Stack)",
      description:
        "A cutting-edge MERN application featuring JWT-based authentication, real-time messaging with Socket.IO, and advanced features like typing indicators, file uploads(image only), and admin controls.",
      image:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "React.js",
        "Node.js",
        "Socket.IO",
        "MongoDB",
        "Cloudinary",
        "JWT",
      ],
      features: [
        "Real-time messaging with typing indicators",
        "Secure file uploads via Cloudinary",
        "Role-based access control",
        "PWA-ready responsive design",
        "Glass morphism UI effects",
      ],
      github: "https://github.com/Gourav123-sys/Full-stack-chat-Application",
      live: "https://full-stack-chat-application-chi.vercel.app/",
      icon: MessageCircle,
      color: "from-blue-500 via-purple-500 to-cyan-500",
      bgGradient: "from-blue-500/10 via-purple-500/10 to-cyan-500/10",
    },
    {
      title: "Personal Finance Visualizer (Full-Stack)",
      description:
        "A comprehensive MERN stack application for managing personal finances with interactive dashboards, budget tracking, and real-time transaction management.",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "Express.js", "MongoDB", "Chart.js", "JWT"],
      features: [
        "Interactive financial dashboards",
        "Real-time budget tracking",
        "Category-wise expense analysis",
        "Secure transaction management",
        "Indian Rupee-based calculations",
      ],
      github:
        "https://github.com/Gourav123-sys/Fullstack-Personal-Finance-Vizualizer",
      live: "https://fullstack-personal-finance-vizualiz.vercel.app/",
      icon: DollarSign,
      color: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Car Finder Web App (Frontend)",
      description:
        "A modern car discovery platform with advanced search filters, wishlist & cart functionality(localStorage), and responsive design using external APIs for real-time data.",
      image:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "NHTSA API", "Imagin Studio", "Local Storage"],
      features: [
        "Advanced search and filtering",
        "Persistent cart and wishlist",
        "Real-time car data from APIs",
        "Smooth animations and transitions",
        "Mobile-first responsive design",
      ],
      github: "https://github.com/Gourav123-sys/CarFinder",
      live: "https://car-finder-jade.vercel.app/",
      icon: Car,
      color: "from-orange-500 via-red-500 to-pink-500",
      bgGradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
    },
    {
      title: "Custom Solar System Visualizer (Frontend)",
      description:
        "An interactive 3D solar system visualization with realistic planetary movements, orbital mechanics, speed controls, and educational information about celestial bodies.",
      image:
        "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "Three.js", "WebGL", "CSS3 Animations"],
      features: [
        "3D planetary visualization",
        "Realistic orbital mechanics",
        "Interactive planet information",
        "Smooth camera controls",
        "Educational content integration",
      ],
      github: "https://github.com/Gourav123-sys/custom-solar-system-visualizer",
      live: "https://custom-solar-system-visualizer.vercel.app/",
      icon: Sun,
      color: "from-yellow-500 via-orange-500 to-red-500",
      bgGradient: "from-yellow-500/10 via-orange-500/10 to-red-500/10",
    },
    {
      title: "My-Tube Backend API (Backend)",
      description:
        "A robust backend API system built with Node.js and Express.js, featuring comprehensive video management, user authentication, and scalable architecture.",
      image:
        "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Multer",
        "Cloudinary",
      ],
      features: [
        "RESTful API architecture",
        "Video upload and management",
        "User authentication system",
        "Database optimization",
        "Scalable backend design",
      ],
      github: "https://github.com/Gourav123-sys/My-Tube-Backend",
      live: "#",
      icon: Globe,
      color: "from-red-500 via-pink-500 to-purple-500",
      bgGradient: "from-red-500/10 via-pink-500/10 to-purple-500/10",
    },
    {
      title: "Crypto Tracker Dashboard (Frontend)",
      description:
        "Real-time cryptocurrency tracking application (mock-data) with live price updates, portfolio management, and market analysis tools.",
      image:
        "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "LocalStorage"],
      features: [
        "Real-time price tracking",
        "Portfolio management",
        "Market trend analysis",
        "Historical data visualization",
      ],
      github: "https://github.com/Gourav123-sys/cryptoTracker",
      live: "https://stock-tracker-flax.vercel.app/",
      icon: Zap,
      color: "from-purple-500 via-indigo-500 to-blue-500",
      bgGradient: "from-purple-500/10 via-indigo-500/10 to-blue-500/10",
    },
    {
      title: "Employee Management System (Frontend)",
      description:
        "Comprehensive employee management platform with employee records, work tracking, payroll management, and performance analytics.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js"],
      features: [
        "Employee record management",
        "Work tracking system",
        "Role-based access control",
      ],
      github: "https://github.com/Gourav123-sys/Employee-Management-System",
      live: "https://employee-management-system-six-sandy.vercel.app/",
      icon: Users,
      color: "from-cyan-500 via-blue-500 to-indigo-500",
      bgGradient: "from-cyan-500/10 via-blue-500/10 to-indigo-500/10",
    },
    {
      title: "Spotify Clone (Frontend)",
      description:
        "Full-featured music playing application with responsive audio player interface with features like play, pause, next, previous, and audio range control.",
      image:
        "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      features: [
        "Music playing interface",
        "Audio player controls",
        "Responsive design",
        "Audio range control",
      ],
      github: "https://github.com/Gourav123-sys/Spotify-Clone",
      live: "https://spotify-clone-eosin-psi.vercel.app/",
      icon: Music,
      color: "from-green-500 via-teal-500 to-cyan-500",
      bgGradient: "from-green-500/10 via-teal-500/10 to-cyan-500/10",
    },
    {
      title: "Amazon Clone Website (Frontend)",
      description:
        "E-commerce platform replica with product catalog, shopping cart, user authentication, and checkout functionality.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      features: [
        "Product catalog browsing (UI only)",
        "Shopping cart functionality (UI only)",
      ],
      github: "https://github.com/Gourav123-sys/Amazon_clone_website",
      live: "https://gourav123-sys.github.io/Amazon_clone_website/",
      icon: ShoppingCart,
      color: "from-orange-500 via-yellow-500 to-red-500",
      bgGradient: "from-orange-500/10 via-yellow-500/10 to-red-500/10",
    },
    {
      title: "Contact Management System",
      description:
        "Comprehensive contact management application with CRUD operations, search functionality, and organized contact categorization.",
      image:
        "https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["c++"],
      features: [
        "Contact CRUD operations",
        "Contact categorization",
      ],
      github: "https://github.com/Gourav123-sys/Contact-Management-System",
      live: "#",
      icon: Phone,
      color: "from-indigo-500 via-purple-500 to-pink-500",
      bgGradient: "from-indigo-500/10 via-purple-500/10 to-pink-500/10",
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  return (
    <section
      id="projects"
      className={`py-32 relative overflow-hidden ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ willChange: "opacity, transform" }}
          className="text-center mb-20"
        >
          <h2
            className={`text-6xl md:text-7xl font-black mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className={`text-xl mt-6 max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore my diverse portfolio of full-stack applications, from
            real-time chat platforms to financial dashboards and interactive
            visualizations.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Main Project Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-3xl group">
                  <div className="relative">
                    <img
                      src={projects[currentProject].image}
                      alt={projects[currentProject].title}
                      className="w-full h-96 object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${projects[currentProject].bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />

                    {/* Floating Icon */}
                    <div
                      className={`absolute top-6 left-6 p-4 rounded-2xl bg-gradient-to-r ${projects[currentProject].color} shadow-2xl`}
                    >
                      {React.createElement(projects[currentProject].icon, {
                        className: "text-white",
                        size: 32,
                      })}
                    </div>

                    {/* Live Demo Button Overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {projects[currentProject].live !== "#" && (
                        <motion.a
                          href={projects[currentProject].live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`px-8 py-4 bg-gradient-to-r ${projects[currentProject].color} text-white rounded-2xl font-bold shadow-2xl flex items-center gap-3`}
                        >
                          <ExternalLink size={20} />
                          View Live Demo
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Project Content */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Project Title */}
                  <div>
                    <motion.h3
                      className={`text-4xl md:text-5xl font-black mb-4 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                      style={
                        !isDark
                          ? { textShadow: "0 2px 8px rgba(0,0,0,0.12)" }
                          : {}
                      }
                      whileHover={{}}
                      transition={{ duration: 0.3 }}
                    >
                      {projects[currentProject].title}
                    </motion.h3>

                    <p
                      className={`text-xl leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {projects[currentProject].description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4
                      className={`text-2xl font-bold mb-4 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Key Features:
                    </h4>
                    <ul className="space-y-3">
                      {projects[currentProject].features.map(
                        (feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className={`flex items-center ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + featureIndex * 0.1,
                            }}
                          >
                            <motion.div
                              className={`w-3 h-3 bg-gradient-to-r ${projects[currentProject].color} rounded-full mr-4 flex-shrink-0`}
                              whileHover={{ scale: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                            <span className="text-lg">{feature}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4
                      className={`text-xl font-bold mb-4 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {projects[currentProject].technologies.map(
                        (tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5 + techIndex * 0.1,
                            }}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: isDark
                                ? "0 10px 30px rgba(147, 51, 234, 0.3)"
                                : "0 10px 30px rgba(59, 130, 246, 0.3)",
                            }}
                            className={`px-4 py-2 text-sm font-semibold rounded-xl ${
                              isDark
                                ? "bg-gray-800 text-gray-300 border border-purple-500/20"
                                : "bg-gray-100 text-gray-700 border border-blue-200/50"
                            } cursor-pointer transition-all duration-300`}
                          >
                            {tech}
                          </motion.span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-6">
                    {projects[currentProject].live !== "#" && (
                      <motion.a
                        href={projects[currentProject].live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`group px-8 py-4 bg-gradient-to-r ${projects[currentProject].color} text-white rounded-2xl font-bold shadow-2xl transition-all duration-300 flex items-center gap-3 relative overflow-hidden`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <ExternalLink size={20} className="relative z-10" />
                        <span className="relative z-10">Live Demo</span>
                      </motion.a>
                    )}

                    <motion.a
                      href={projects[currentProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        borderColor: isDark ? "#8b5cf6" : "#3b82f6",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 border-2 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 ${
                        isDark
                          ? "border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10"
                          : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                      }`}
                    >
                      <Github size={20} />
                      View Code
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-16 space-x-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevProject}
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 rounded-xl ${
                isDark
                  ? "bg-gray-800/80 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20"
                  : "bg-white/80 text-blue-600 hover:bg-blue-500/20 border border-blue-200/50"
              } backdrop-blur-xl shadow-lg transition-all duration-300`}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToProject(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject
                      ? `bg-gradient-to-r ${projects[currentProject].color} shadow-lg`
                      : isDark
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextProject}
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 rounded-xl ${
                isDark
                  ? "bg-gray-800/80 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20"
                  : "bg-white/80 text-blue-600 hover:bg-blue-500/20 border border-blue-200/50"
              } backdrop-blur-xl shadow-lg transition-all duration-300`}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Project Counter */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span
              className={`text-lg font-semibold ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Project {currentProject + 1} of {projects.length}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
