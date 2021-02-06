import {createStore, applyMiddleware, combineReducers} from 'redux';
import project, { getAllProjects } from './project';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import socket from '../socket';
import user from './user';

export const SET_PROJECT = 'SET_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'

socket.on('select-project', () => {
  store.dispatch(getAllProjects());
});

const rootReducer = combineReducers({
  user,
  project,
})

const middleware = 
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })
);

const store = createStore(
    rootReducer, middleware
  );
  
export default store;
export * from './project';
export * from './user';