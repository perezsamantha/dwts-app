import React from 'react';
import ReactDOM from 'react-dom';
//import './fonts/Yes-Margo.otf';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import { reducers } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV === 'development' &&
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

//reportWebVitals();
