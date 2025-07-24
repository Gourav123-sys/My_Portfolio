// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTimer(name: string): number {
    const startTime = this.metrics.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.delete(name);
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }

  measurePaint(): void {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
        }
      });
      observer.observe({ entryTypes: ["paint"] });
    }
  }

  measureLCP(): void {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }
  }

  measureFID(): void {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
    }
  }
}

// Image lazy loading utility
export const lazyLoadImage = (img: HTMLImageElement): void => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || "";
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = img.dataset.src || "";
  }
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memory usage monitoring
export const getMemoryUsage = (): string => {
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    const used = Math.round(memory.usedJSHeapSize / 1048576);
    const total = Math.round(memory.totalJSHeapSize / 1048576);
    return `${used}MB / ${total}MB`;
  }
  return "Memory usage not available";
};

// Network information
export const getNetworkInfo = (): string => {
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    return `${connection.effectiveType} (${connection.downlink}Mbps)`;
  }
  return "Network info not available";
};

// Preload critical resources
export const preloadResource = (href: string, as: string): void => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Prefetch non-critical resources
export const prefetchResource = (href: string): void => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
};

// Service Worker utilities
export const registerServiceWorker = async (swPath: string): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(swPath);
      console.log("SW registered: ", registration);
    } catch (error) {
      console.log("SW registration failed: ", error);
    }
  }
};

// Cache utilities
export const clearOldCaches = async (
  currentCacheName: string
): Promise<void> => {
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== currentCacheName)
        .map((name) => caches.delete(name))
    );
  }
};
