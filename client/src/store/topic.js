import axios from 'axios'

// ACTION TYPES
import {SELECT_TOPIC, GET_ALL_TOPICS} from './index'

// ACTION CREATORS
export function selectedTopic (topic) {
    const action = { type: SELECT_TOPIC, topic };
    return action;
}

export function gotAllTopics (topics) {
    const action = { type: GET_ALL_TOPICS, topics };
    return action;
}

// THUNKS
export const getAllTopics = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/topics');
            dispatch(gotAllTopics(data));
        } catch (err) {
            console.error(err);
        }
    };
};
export const selectTopic = (topic) => {
    return async dispatch => {
        const { data } = await axios.post(`/api/topics/select`, topic);
        dispatch(selectedTopic(data));
    };
};
// REDUCER
export default function topic (state = [], action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic;
    case GET_ALL_TOPICS:
      return action.topics;
    default:
      return state;
  }
}
