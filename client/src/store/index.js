import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import user from './user';
import topic, {getAllTopics} from './topic';
import project from './project';
import socket from '../socket';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const GET_ALL_TOPICS = 'GET_ALL_TOPICS';

socket.on('topic', (projectId) => {
  store.dispatch(getAllTopics(projectId));
});

const rootReducer = combineReducers({
  user,
  project,
  topic
})

const middleware = 
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })
);

const store = createStore(
    rootReducer, middleware
);
  
export default store;
export * from './user';
export * from './project';
export * from './topic';
