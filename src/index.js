import React from 'react';
import ReactDOM from 'react-dom';
import { initializeFirebase } from './push-notification';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
initializeFirebase();
registerServiceWorker();
