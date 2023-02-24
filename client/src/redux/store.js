import { configureStore,applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const store=configureStore({reducer:rootReducer},composeWithDevTools(applyMiddleware(logger)))

export default store;