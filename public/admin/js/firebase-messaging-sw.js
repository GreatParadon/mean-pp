importScripts('https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDCUBjZTtP4muRCD3j8iWSSK1jqM7P10r4",
    authDomain: "trendmeal-55b8e.firebaseapp.com",
    databaseURL: "https://trendmeal-55b8e.firebaseio.com",
    storageBucket: "trendmeal-55b8e.appspot.com",
    messagingSenderId: "243733989388"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'New Order!!';
    const option = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, option);
});