import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import { AppConfig } from './AppConfig';

export default (type, params) => {
    if(type === AUTH_LOGIN) {
        const { username, password } = params;

        const options = {};
        options.method = 'POST';
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify({ username: username, password: password });

        return fetch(`${AppConfig.apiUrl}/login`, options)
            .then(response => {
                if(response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(res => {
                localStorage.setItem('token', res.token);
            });
    }

    if(type === AUTH_LOGOUT) {
        removeToken();
        localStorage.removeItem('token');
        localStorage.removeItem('pushToken');

        return Promise.resolve();
    }

    if(type === AUTH_ERROR) {
        const status = params.status;
        if(status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.resolve();
    }

    if(type === AUTH_CHECK) {
        return localStorage.getItem('token') ? checkToken() : Promise.reject()
    }

    return Promise.resolve();
};

const checkToken = () => {
    const options = {};
    options.method = 'GET';
    options.headers = new Headers({});
    options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return fetch(`${AppConfig.apiUrl}/currentUserId`, options)
        .then(response => {
            if(response.status < 200 || response.status >= 300) {
                return Promise.reject({ message: 'Non authorized', status: response.status })
            }
            return Promise.resolve();
        })
};

export const sendToken = (pushToken) => {
    const options = {};
    options.method = 'POST';
    options.headers = new Headers({});
    options.headers.set('Content-Type', `application/json`);
    options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    options.body = JSON.stringify({ token: pushToken, provider: 'browser' });

    return fetch(`${AppConfig.apiUrl}/notifications/token`, options)
        .then(response => {
            if(response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            localStorage.setItem('pushToken', pushToken);
            return response.json();
        })
        .catch(err => console.log('ERROR:', err));
};

const removeToken = () => {
    if(!localStorage.getItem('pushToken')) return null;
    const options = {};
    options.method = 'DELETE';
    options.headers = new Headers({});
    options.headers.set('Content-Type', `application/json`);
    options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return fetch(`${AppConfig.apiUrl}/notifications/token/${localStorage.getItem('pushToken')}`, options)
        .then(response => {
            if(response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .catch(err => console.log('ERROR:', err));
};