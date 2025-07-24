import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PerformanceMonitor } from "./utils/performance";
import { initializeAccessibility } from "./utils/accessibility";

// Initialize performance monitoring
const performanceMonitor = PerformanceMonitor.getInstance();
performanceMonitor.startTimer("app-init");

// Initialize accessibility features
initializeAccessibility();

// Performance monitoring
if ("PerformanceObserver" in window) {
  // Monitor paint timing
  performanceMonitor.measurePaint();

  // Monitor Largest Contentful Paint
  performanceMonitor.measureLCP();

  // Monitor First Input Delay
  performanceMonitor.measureFID();
}

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalResources = [{ href: "/favicon.svg", as: "image" }];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
};

// Prefetch non-critical resources
const prefetchNonCriticalResources = () => {
  const nonCriticalResources = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
  ];

  nonCriticalResources.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  });
};

// Initialize app
const initializeApp = () => {
  // Preload critical resources
  preloadCriticalResources();

  // Prefetch non-critical resources after a delay
  setTimeout(prefetchNonCriticalResources, 2000);

  // Create root and render app
  const root = createRoot(document.getElementById("root")!);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // End performance timer
  performanceMonitor.endTimer("app-init");
};

// Start app initialization
initializeApp();

// Error boundary for unhandled errors
window.addEventListener("error", (event) => {
  console.error("Unhandled error:", event.error);
  // Send to error tracking service if configured
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  // Send to error tracking service if configured
});

// Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Performance monitoring for user interactions
let interactionCount = 0;
const trackUserInteraction = () => {
  interactionCount++;
  if (interactionCount === 1) {
    // First user interaction
    performanceMonitor.startTimer("first-interaction");
  } else if (interactionCount === 5) {
    // Fifth user interaction
    performanceMonitor.endTimer("first-interaction");
  }
};

// Track user interactions
document.addEventListener("click", trackUserInteraction, { once: false });
document.addEventListener("keydown", trackUserInteraction, { once: false });
document.addEventListener("scroll", trackUserInteraction, { once: false });

// Memory usage monitoring (development only)
if (process.env.NODE_ENV === "development") {
  setInterval(() => {
    if ("memory" in performance) {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1048576);
      const total = Math.round(memory.totalJSHeapSize / 1048576);

      if (used > total * 0.8) {
        console.warn("High memory usage detected:", `${used}MB / ${total}MB`);
      }
    }
  }, 30000); // Check every 30 seconds
}
