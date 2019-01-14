import firebase from 'firebase/app';
import '@firebase/messaging';
import { AppConfig } from './AppConfig';

export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: AppConfig.apiKey,
        messagingSenderId: AppConfig.messagingSenderId
    });
};

export const getAllNotifications = async() => {
    try {
        const options = {};
        options.method = 'GET';
        options.headers = new Headers({});
        options.headers.set('Content-Type', `application/json`);
        options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return fetch(`${AppConfig.apiUrl}/notifications/`, options)
            .then(response => {
                if(response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json().then(res => res.length);
            })
            .catch(err => console.log('ERROR:', err));
    } catch(error) {
        console.error('ERROR:', error);
    }
};
