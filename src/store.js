import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';
import {applyMiddleware, combineReducers, compose as origCompose, createStore} from 'redux';
import thunk from 'redux-thunk';

import app from './reducers/app.js';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store = createStore((state, action) => state, compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk)));

store.addReducers({app});
