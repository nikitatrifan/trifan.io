import 'normalize.css';
import './index.css';
import 'gsap/ScrollToPlugin'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import metrika from './metrika'
import registerServiceWorker from './registerServiceWorker';

const Application = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(Application, document.getElementById('root'));
registerServiceWorker();
metrika();
