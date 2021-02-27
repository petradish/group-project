import axios from 'axios'

// ACTION TYPES
import {GET_ALL_TOPICS, SELECT_TOPIC} from './index'
import socket from '../socket';

// ACTION CREATORS
export function selectedTopic({allTopics, selectedTopic}) {
    const action = {type: SELECT_TOPIC, allTopics, selectedTopic};
    return action;
}

export function gotAllTopics(allTopics) {
    const action = {type: GET_ALL_TOPICS, allTopics};
    return action;
}

// THUNKS
export const getAllTopics = (projectId) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/topics/${projectId}`);
            dispatch(gotAllTopics(data));
        } catch (err) {
            console.error(err);
        }
    };
};
export const selectTopic = (topic) => {
    return async dispatch => {
        const {data} = await axios.post(`/api/topics/select`, topic);
        dispatch(selectedTopic(data));
        socket.emit('select-topic', {projectId: data.selectedTopic.projectId});
    };
};
// REDUCER
export default function topic(state = {}, action) {
    switch (action.type) {
        case SELECT_TOPIC:
            return {...state, allTopics: action.allTopics, selectedTopic: action.selectedTopic};
        case GET_ALL_TOPICS:
            return {...state, allTopics: action.allTopics};
        default:
            return state;
    }
}
