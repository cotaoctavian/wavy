import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import { setUpUser } from './actions';
import { loadState } from './localStorage';
import jwt from 'jsonwebtoken';

var TOKEN_SECRET = "dfbddaa96743484f7c6489b559d941ad1c6f2c3c8a2c5b432f0a70d7871265c4f4322a5ff62b52b13505be14141f0d29b3684a85d47f597ab69755e5c0193cd3"
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();
const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)))

try {
    const data = jwt.verify(persistedState, TOKEN_SECRET)
    store.dispatch(setUpUser(data))
} catch (err) {
    
}

localStorage.setItem('repeatMode', 0);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));

serviceWorker.unregister();
