import 'normalize.css';
import './index.css';
import 'gsap/ScrollToPlugin'
import 'gsap/TextPlugin'
import 'mousetrap'
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import metrika from './metrika'
import registerServiceWorker from './registerServiceWorker';

const Application = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

render(Application, document.getElementById('root'));

// did you know create-react-app supports HRM?
if (module.hot) {
    module.hot.accept(() => {
        const App = require('./App.js').default;

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,

            document.getElementById('root')
        );
    });
}

registerServiceWorker();
metrika();
