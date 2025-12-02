// Simplified accessibility initialization
// Removed heavy DOM queries and global listeners that could cause lag

export const initializeAccessibility = (): void => {
  // Setup reduced motion preference (lightweight)
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const handleReducedMotion = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  };
  reducedMotionQuery.addEventListener("change", handleReducedMotion);
  handleReducedMotion(reducedMotionQuery);
};
