const CACHE_NAME = "gourav-portfolio-v1.0.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/Gourav_Mondal_Resume.pdf",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        // Add resources one by one to handle individual failures
        return Promise.allSettled(
          urlsToCache.map((url) =>
            cache.add(url).catch((error) => {
              console.log(`Failed to cache ${url}:`, error);
              return null;
            })
          )
        );
      })
      .catch((error) => {
        console.error("Cache installation failed:", error);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip chrome-extension and other non-http requests
  if (
    !event.request.url.startsWith("http") ||
    event.request.url.startsWith("chrome-extension://")
  ) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response because it's a stream
          const responseToCache = response.clone();

          // Only cache same-origin requests
          if (event.request.url.startsWith(self.location.origin)) {
            caches
              .open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.log("Cache put failed:", error);
              });
          }

          return response;
        });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions or other background tasks
  console.log("Background sync triggered");
}

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/favicon.svg",
    badge: "/favicon.svg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Portfolio",
        icon: "/favicon.svg",
      },
      {
        action: "close",
        title: "Close",
        icon: "/favicon.svg",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Gourav Mondal Portfolio", options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
