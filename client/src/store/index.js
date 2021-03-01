import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger';
import user from './user';
import classroom from './classroom';
import topic, {getAllTopics} from './topic';
import project from './project';
import socket from '../socket';

export const GET_ALL_CLASSROOMS = 'GET_ALL_CLASSROOMS';
export const GET_CLASSROOM = 'GET_CLASSROOM';

export const GET_PROJECT = 'GET_PROJECT';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const GET_ALL_TOPICS = 'GET_ALL_TOPICS';

socket.on('topic', (projectId) => {
    store.dispatch(getAllTopics(projectId));
});

const rootReducer = combineReducers({
    user,
    classroom,
    project,
    topic
})

const middleware =
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true})
    );

const store = createStore(
    rootReducer, middleware
);

export default store;
export * from './user';
export * from './classroom';
export * from './project';
export * from './topic';
