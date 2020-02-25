import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store = { myStore }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , 
    document.getElementById('root'));

serviceWorker.unregister();
