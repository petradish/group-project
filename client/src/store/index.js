import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import socket from '../socket';
import user from './user';
import topic, {getAllTopics} from './topic';
import project, {getAllProjects, createProject} from './project';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const GET_ALL_TOPICS = 'GET_ALL_TOPICS';

socket.on('select-topic', () => {
  store.dispatch(getAllTopics());
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
