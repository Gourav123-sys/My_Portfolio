import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  ExternalLink,
  MessageCircle,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

interface ContactProps {
  isDark: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC<ContactProps> = ({ isDark }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // No need for EmailJS initialization with @emailjs/browser package

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "gourav.mondal.bits@gmail.com",
      href: "mailto:gourav.mondal.bits@gmail.com",
      color: "from-blue-500 via-indigo-500 to-purple-600",
      description: "Drop me a line anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-7717773895",
      href: "tel:+917717773895",
      color: "from-green-500 via-emerald-500 to-teal-600",
      description: "Let's have a conversation",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Sindri, Jharkhand, India",
      href: "#",
      color: "from-purple-500 via-pink-500 to-red-600",
      description: "Come say hello",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/Gourav123-sys",
      color: "from-gray-700 to-gray-900",
      followers: "50+ Repos",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/gourav-mondal-55a812204",
      color: "from-blue-600 to-blue-800",
      followers: "500+ Connections",
    },
  ];

  const codingLinks = [
    {
      icon: ExternalLink,
      name: "LeetCode",
      href: "https://leetcode.com/u/gourav30/",
      color: "from-orange-500 to-red-500",
      followers: "280+ Problems",
    },
    {
      icon: ExternalLink,
      name: "CodeChef",
      href: "https://www.codechef.com/users/gour_av",
      color: "from-yellow-500 to-orange-500",
      followers: "1593 Rating",
    },
    {
      icon: ExternalLink,
      name: "Codeforces",
      href: "https://codeforces.com/profile/gourav30",
      color: "from-blue-500 to-indigo-500",
      followers: "",
    },
    {
      icon: ExternalLink,
      name: "HackerRank",
      href: "https://www.hackerrank.com/profile/gouravmondal30j1",
      color: "from-green-500 to-emerald-500",
      followers: "5★ Rating",
    },
    {
      icon: ExternalLink,
      name: "GeeksforGeeks",
      href: "https://www.geeksforgeeks.org/user/gouravmondal30june2002/",
      color: "from-green-600 to-teal-600",
      followers: "Active Profile",
    },
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_USER_ID; // Same env var, different usage
      
      // Check if all required credentials are available
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS credentials not found in environment variables');
        toast.error(
          "Email service is not configured. Please contact me directly through the provided email address."
        );
        throw new Error('Email service configuration is missing');
      }
      
      // Show sending toast
      const sendingToast = toast.loading("Sending your message...");
      
      try {
        // Prepare form data for EmailJS
        // This ensures the form data is properly mapped to template variables
        const formElement = formRef.current;
        if (!formElement) {
          throw new Error('Form reference is not available');
        }

        // Set form field names to match template variables
        const nameInput = formElement.querySelector('#name') as HTMLInputElement;
        const emailInput = formElement.querySelector('#email') as HTMLInputElement;
        const subjectInput = formElement.querySelector('#subject') as HTMLInputElement;
        const messageInput = formElement.querySelector('#message') as HTMLTextAreaElement;
        
        if (nameInput) nameInput.name = 'from_name';
        if (emailInput) emailInput.name = 'from_email';
        if (subjectInput) subjectInput.name = 'subject';
        if (messageInput) messageInput.name = 'message';
        
        // Send email using EmailJS with the newer API pattern
        const response = await emailjs.sendForm(
          serviceId,
          templateId,
          formElement,
          { publicKey: publicKey }
        );
        
        // Log success for debugging
        console.log('Email successfully sent!', response);
        
        // Update sending toast to success
        toast.success("Message sent successfully! I'll get back to you soon.", {
          id: sendingToast,
        });
        
        // Success handling
        setIsSuccess(true);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (emailError) {
        // Update sending toast to error
        toast.error(
          "Failed to send message. Please try again or contact me directly.",
          { id: sendingToast }
        );
        throw emailError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard!`);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 sm:py-24 md:py-32 relative overflow-hidden px-4 sm:px-6 ${
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
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl"
        />
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
          <motion.h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            style={{ scale }}
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>
          <motion.div
            className="w-24 sm:w-32 h-1 sm:h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm always excited to discuss new opportunities, innovative
            projects, or just have a chat about technology. Let's connect and
            create something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Let's Connect
            </h3>

            {/* Contact Info Cards */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`group relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                      : "bg-white/50 border-gray-200 hover:border-purple-500/50"
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${info.color} shadow-lg flex-shrink-0`}
                    >
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-lg mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {info.title}
                      </h4>
                      <p
                        className={`text-sm mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {info.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <a
                          href={info.href}
                          className={`text-sm sm:text-base font-medium hover:text-purple-500 transition-colors break-all ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          }`}
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.value}
                        </a>
                        {info.title !== "Location" && (
                          <button
                            onClick={() =>
                              copyToClipboard(info.value, info.title)
                            }
                            className={`p-1.5 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                            aria-label={`Copy ${info.title.toLowerCase()}`}
                          >
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                       )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social & Coding Links */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8">
              {[...socialLinks, ...codingLinks].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    boxShadow: "0 8px 24px 0 rgba(80,80,180,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r ${link.color} cursor-pointer p-1`}
                >
                  {typeof link.icon === "string" ? (
                    <img
                      src={link.icon}
                      alt={link.name}
                      className="mb-1 sm:mb-2 flex-shrink-0"
                      style={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <link.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 flex-shrink-0" />
                  )}
                  <span className="text-center leading-tight text-xs sm:text-sm px-1 break-words">
                    {link.name === "GeeksforGeeks" ? "GFG" : link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-1 lg:order-2"
          >
            <div
              className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/50 border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Send Message
              </h3>

              {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4
                      className={`text-xl font-semibold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Message Sent!
                    </h4>
                    <p
                      className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  /* Developer Note - Remove this in production after setting up EmailJS */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`p-4 mb-6 rounded-lg border ${isDark ? "bg-yellow-900/20 border-yellow-700/50 text-yellow-200" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}
                  >
                    <p className="text-sm">
                      <strong>Note:</strong> To make this contact form functional, you need to set up EmailJS. See the README.md file for instructions.
                    </p>
                  </motion.div>
                )}
                
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
              >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                            : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                        } ${errors.name ? "border-red-500" : ""}`}
                        placeholder="Your full name"
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        aria-invalid={!!errors.name}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-1 text-sm text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                            : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                        } ${errors.email ? "border-red-500" : ""}`}
                        placeholder="your.email@example.com"
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        aria-invalid={!!errors.email}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-1 text-sm text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                            : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                        } ${errors.subject ? "border-red-500" : ""}`}
                        placeholder="What's this about?"
                        aria-describedby={
                          errors.subject ? "subject-error" : undefined
                        }
                        aria-invalid={!!errors.subject}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.subject && (
                      <p
                        id="subject-error"
                        className="mt-1 text-sm text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full py-3 rounded-xl border transition-all duration-300 resize-none px-4 pr-4 ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                            : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                        } ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Tell me about your project or just say hello!"
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        aria-invalid={!!errors.message}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-500 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white ${isSuccess ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600"} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}
                    aria-label={
                      isSubmitting ? "Sending message..." : isSuccess ? "Message sent successfully" : "Send message"
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
