import axios from 'axios'

// ACTION TYPES
import {GET_PROJECT} from './index'

// ACTION CREATORS
export function gotProject(project) {
    const action = {type: GET_PROJECT, project};
    return action;
}

export const getProject = (linkName) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/projects${linkName}`);
        dispatch(gotProject(data));
    };
};

export const createProject = (project) => {
    return async () => {
        await axios.post(`/api/projects/create`, project);
    };
};

export const updateProject = (project) => {
    return async () => {
        await axios.post(`/api/projects/update`, project);
    };
};

export const deleteProject = (id) => {
    return async () => {
        await axios.get(`/api/projects/delete/${id}`);
    };
};

export const deleteTopic = (topicId) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/projects/delete/topic/${topicId}`);
        dispatch(gotProject(data));
    };
};

// REDUCER
export default function project(state = {}, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {...state, project: action.project};
        default:
            return state;
    }
}
