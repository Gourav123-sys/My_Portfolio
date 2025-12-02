import React, { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import Skills from "./components/Skills";

// Lazy load components for better performance
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Achievements = lazy(() => import("./components/Achievements"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const ComponentLoader = ({ componentName }: { componentName: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500">Loading {componentName}...</p>
    </div>
  </div>
);

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ErrorBoundaryClass>
      <div
        className={`min-h-screen ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        id="main-content"
        role="main"
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDark ? "#374151" : "#ffffff",
              color: isDark ? "#ffffff" : "#374151",
              border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
            },
          }}
        />

        <Suspense fallback={<ComponentLoader componentName="Header" />}>
          <Header isDark={isDark} toggleTheme={toggleTheme} />
        </Suspense>
        <Suspense fallback={<ComponentLoader componentName="Hero" />}>
          <Hero isDark={isDark} />
        </Suspense>
        <Suspense fallback={<ComponentLoader componentName="About" />}>
          <About isDark={isDark} />
        </Suspense>
        <Skills isDark={isDark} />
        <Suspense fallback={<ComponentLoader componentName="Projects" />}>
          <Projects isDark={isDark} />
        </Suspense>
        <Suspense fallback={<ComponentLoader componentName="Achievements" />}>
          <Achievements isDark={isDark} />
        </Suspense>
        <Suspense fallback={<ComponentLoader componentName="Contact" />}>
          <Contact isDark={isDark} />
        </Suspense>
        <Suspense fallback={<ComponentLoader componentName="Footer" />}>
          <Footer isDark={isDark} />
        </Suspense>
      </div>
    </ErrorBoundaryClass>
  );
}

export default App;
