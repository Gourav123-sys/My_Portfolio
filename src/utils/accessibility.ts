// Accessibility utilities
export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private focusableElements: string =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  // Trap focus within a container
  trapFocus(container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      this.focusableElements
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }

  // Announce to screen readers
  announce(message: string, priority: "polite" | "assertive" = "polite"): void {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Skip to main content
  setupSkipLink(): void {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";
    skipLink.setAttribute("tabindex", "0");

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Handle keyboard navigation
  setupKeyboardNavigation(): void {
    document.addEventListener("keydown", (e) => {
      // Escape key to close modals/dropdowns
      if (e.key === "Escape") {
        const activeModal = document.querySelector('[data-modal="open"]');
        if (activeModal) {
          (activeModal as HTMLElement).click();
        }
      }

      // Enter/Space to activate buttons
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "BUTTON" ||
          target.getAttribute("role") === "button"
        ) {
          e.preventDefault();
          target.click();
        }
      }
    });
  }

  // Add ARIA labels to interactive elements
  enhanceAriaLabels(): void {
    // Add labels to buttons without text
    const iconButtons = document.querySelectorAll(
      "button:not([aria-label]):not([aria-labelledby])"
    );
    iconButtons.forEach((button) => {
      const icon = button.querySelector("svg, i");
      if (icon && !button.textContent?.trim()) {
        const iconClass = icon.className;
        const label = this.getIconLabel(iconClass);
        if (label) {
          button.setAttribute("aria-label", label);
        }
      }
    });

    // Add labels to links without text
    const iconLinks = document.querySelectorAll(
      "a:not([aria-label]):not([aria-labelledby])"
    );
    iconLinks.forEach((link) => {
      const icon = link.querySelector("svg, i");
      if (icon && !link.textContent?.trim()) {
        const iconClass = icon.className;
        const label = this.getIconLabel(iconClass);
        if (label) {
          link.setAttribute("aria-label", label);
        }
      }
    });
  }

  // Get label for common icons
  private getIconLabel(iconClass: string): string | null {
    const iconLabels: Record<string, string> = {
      github: "GitHub",
      linkedin: "LinkedIn",
      twitter: "Twitter",
      mail: "Email",
      phone: "Phone",
      "map-pin": "Location",
      "external-link": "External link",
      download: "Download",
      menu: "Menu",
      close: "Close",
      search: "Search",
      home: "Home",
      user: "User",
      settings: "Settings",
    };

    for (const [key, label] of Object.entries(iconLabels)) {
      if (iconClass.includes(key)) {
        return label;
      }
    }

    return null;
  }

  // Handle reduced motion preferences
  setupReducedMotion(): void {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionPreference = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        document.documentElement.classList.add("reduced-motion");
      } else {
        document.documentElement.classList.remove("reduced-motion");
      }
    };

    mediaQuery.addEventListener("change", handleMotionPreference);
    handleMotionPreference(mediaQuery);
  }

  // Handle high contrast preferences
  setupHighContrast(): void {
    const mediaQuery = window.matchMedia("(prefers-contrast: high)");

    const handleContrastPreference = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    };

    mediaQuery.addEventListener("change", handleContrastPreference);
    handleContrastPreference(mediaQuery);
  }

  // Focus management for modals
  manageModalFocus(modal: HTMLElement, isOpen: boolean): void {
    if (isOpen) {
      // Store previously focused element
      const previouslyFocused = document.activeElement as HTMLElement;
      modal.setAttribute(
        "data-previously-focused",
        previouslyFocused?.id || ""
      );

      // Trap focus in modal
      this.trapFocus(modal);
    } else {
      // Restore focus to previously focused element
      const previouslyFocusedId = modal.getAttribute("data-previously-focused");
      if (previouslyFocusedId) {
        const element = document.getElementById(previouslyFocusedId);
        if (element) {
          element.focus();
        }
      }
    }
  }

  // Handle form validation announcements
  announceFormValidation(
    field: HTMLElement,
    isValid: boolean,
    message: string
  ): void {
    const fieldId = field.id;
    const errorId = `${fieldId}-error`;

    // Remove existing error message
    const existingError = document.getElementById(errorId);
    if (existingError) {
      existingError.remove();
    }

    if (!isValid) {
      // Create error message
      const errorElement = document.createElement("div");
      errorElement.id = errorId;
      errorElement.className = "error-message";
      errorElement.setAttribute("role", "alert");
      errorElement.textContent = message;

      // Insert after the field
      field.parentNode?.insertBefore(errorElement, field.nextSibling);

      // Announce to screen readers
      this.announce(message, "assertive");
    }

    // Update ARIA attributes
    field.setAttribute("aria-invalid", (!isValid).toString());
    field.setAttribute("aria-describedby", isValid ? "" : errorId);
  }

  // Handle loading states
  announceLoadingState(element: HTMLElement, isLoading: boolean): void {
    if (isLoading) {
      element.setAttribute("aria-busy", "true");
      element.setAttribute("aria-live", "polite");
      this.announce("Loading...");
    } else {
      element.removeAttribute("aria-busy");
      element.removeAttribute("aria-live");
    }
  }

  // Handle progress indicators
  updateProgress(progress: number, label: string): void {
    const progressElement = document.querySelector(
      '[role="progressbar"]'
    ) as HTMLElement;
    if (progressElement) {
      progressElement.setAttribute("aria-valuenow", progress.toString());
      progressElement.setAttribute("aria-valuetext", `${progress}% ${label}`);
    }
  }
}

// Utility functions
export const isKeyboardEvent = (event: KeyboardEvent): boolean => {
  return (
    event.key === "Tab" ||
    event.key === "Enter" ||
    event.key === " " ||
    event.key === "Escape"
  );
};

export const isFocusable = (element: HTMLElement): boolean => {
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return element.matches(focusableSelectors);
};

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(
    container.querySelectorAll(focusableSelectors)
  ) as HTMLElement[];
};

export const focusFirstElement = (container: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

export const focusLastElement = (container: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[focusableElements.length - 1].focus();
  }
};

// Initialize accessibility features
export const initializeAccessibility = (): void => {
  const accessibility = AccessibilityManager.getInstance();

  // Setup basic accessibility features
  accessibility.setupSkipLink();
  accessibility.setupKeyboardNavigation();
  accessibility.setupReducedMotion();
  accessibility.setupHighContrast();
  accessibility.enhanceAriaLabels();

  // Announce page load
  accessibility.announce("Page loaded successfully");
};
