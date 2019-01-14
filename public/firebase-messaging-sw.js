import { AppConfig } from '../src/AppConfig';

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: AppConfig.apiKey,
    messagingSenderId: AppConfig.messagingSenderId
});

const messaging = firebase.messaging();