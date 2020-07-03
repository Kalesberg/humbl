importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDjRbwLZszkqzsJvLBsn5k45M6cgfiyTXE",
    authDomain: "humbl-lite.firebaseapp.com",
    databaseURL: "https://humbl-lite.firebaseio.com",
    projectId: "humbl-lite",
    storageBucket: "humbl-lite.appspot.com",
    messagingSenderId: "630870458757",
    appId: "1:630870458757:web:d230b766a65312078904ec"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '../assets/icons/icon-72x72.png'
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});