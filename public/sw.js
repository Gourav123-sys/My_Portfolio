const CACHE_NAME = "gourav-portfolio-v1.0.1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/Gourav_Mondal_Resume.pdf",
  "/assets/css/index-*.css",
  "/assets/js/vendor-*.js",
  "/assets/js/main-*.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
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

// Fetch event - serve from cache, fallback to network with improved mobile handling
self.addEventListener("fetch", (event) => {
  // Skip chrome-extension and other non-http requests
  if (
    !event.request.url.startsWith("http") ||
    event.request.url.startsWith("chrome-extension://")
  ) {
    return;
  }

  // For HTML navigation requests - use network-first strategy
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Clone the response because it's a stream
          const networkResponseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // If network fails, serve from cache
          return caches.match("/index.html");
        })
    );
    return;
  }

  // For API requests - use network-only strategy
  if (event.request.url.includes("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For static assets - use cache-first strategy
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version if found
        if (response) {
          return response;
        }

        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();

        // Network request with timeout for mobile
        return Promise.race([
          fetch(fetchRequest),
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Network timeout')), 5000);
          })
        ])
        .then((response) => {
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
        })
        .catch((error) => {
          console.log('Fetch failed:', error);
          // For image requests, return a fallback image
          if (event.request.destination === 'image') {
            return caches.match('/favicon.svg');
          }
          // For other requests, just propagate the error
          throw error;
        });
      })
      .catch(() => {
        // Return offline page for navigation requests as last resort
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
  if (event.tag === "contact-form-sync") {
    event.waitUntil(syncContactForm());
  }
});

// IndexedDB setup for offline form storage
const dbPromise = indexedDB.open('portfolio-offline-db', 1, (db) => {
  if (!db.objectStoreNames.contains('contact-forms')) {
    db.createObjectStore('contact-forms', { keyPath: 'id', autoIncrement: true });
  }
});

// Function to store form data when offline
function storeContactForm(formData) {
  return dbPromise.then(db => {
    const tx = db.transaction('contact-forms', 'readwrite');
    const store = tx.objectStore('contact-forms');
    store.add(formData);
    return tx.complete;
  });
}

// Function to sync stored form data when back online
function syncContactForm() {
  return dbPromise.then(db => {
    const tx = db.transaction('contact-forms', 'readwrite');
    const store = tx.objectStore('contact-forms');
    return store.getAll().then(forms => {
      return Promise.all(forms.map(form => {
        // Attempt to send each stored form
        return fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        .then(response => {
          if (response.ok) {
            // If successful, remove from store
            const tx = db.transaction('contact-forms', 'readwrite');
            const store = tx.objectStore('contact-forms');
            return store.delete(form.id).then(() => tx.complete);
          }
        });
      }));
    });
  });
}

// Message handling from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "STORE_CONTACT_FORM") {
    storeContactForm(event.data.formData)
      .then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
      .catch((error) => {
        console.error("Error storing contact form:", error);
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: false, error: error.message });
        }
      });
  }
});

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
