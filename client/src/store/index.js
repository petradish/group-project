import {createStore, applyMiddleware, combineReducers} from 'redux';
import name from './name';
import project, { getAllProjects } from './project';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import socket from '../socket';

export const UPDATE_NAME = 'UPDATE_NAME';
export const SET_PROJECT = 'SET_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'

socket.on('select-project', () => {
  store.dispatch(getAllProjects());
});

const rootReducer = combineReducers({
  name,
  project,
})

const middleware = 
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })
);

const store = createStore(
    rootReducer, middleware
  );
  
export default store;
export * from './name';
export * from './project';
export * from './user';