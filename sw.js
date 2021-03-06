const staticCacheName = 'site-static-v1.11';
const dynamicCacheName = 'site-dynamic-v1.11';
const assets = [ 
  './',
  './index.html',
  './js/app.js',
  './js/ui.js',
  './js/materialize.min.js',
  './css/styles.css',
  './css/materialize.min.css',
  './img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  './pages/fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        console.log(evt.request);
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        } 
      })
    );
  }
});

// nootification events
// ???????????????
//self.addEventListener('push', () => {
//  self.registration.showNotification('test message', {});
//});

//var pushData={};
//// ?????????
//self.addEventListener('push', (evt)=> {
//  //pushData = evt.data.json();
//  console.log(evt.data);
//  pushData = evt.data;
//  self.registration.showNotification('test message', {});
//});


self.addEventListener('push', function(event) {
  var notiPayload = {};
  
  if (event.data) {
    const dataText = event.data.text();
//    notificationTitle = 'Custom Notification';
//    notificationOptions.body = 'Message: ' + `${dataText}`;
//    var title = event.data.notification.title;
//    var message = event.data.notification.message;
//    var icon = event.data.notification.icon;
//    var notificationTag = event.data.notification.tag;
    notiPayload = event.data.json();
    console.log(dataText, notiPayload);
  }
  
  var options = {
    body: notiPayload.body,
    icon: './img/icons/icon-72x72.png',
    image: './img/dish.png',
    requireInteraction: true,
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: './img/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: './img/icons/icon-72x72.png'
      }
    ]
    
  };
  
  self.registration.showNotification(notiPayload.title, options);
  
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  //var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://127.0.0.1:3218/');
    notification.close();
  }
});








