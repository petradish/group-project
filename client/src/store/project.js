import axios from 'axios'

// ACTION TYPES
import {CREATE_PROJECT, GET_ALL_PROJECTS, GET_PROJECT} from './index'
import history from '../history';

// ACTION CREATORS
export function createdProject(project) {
    const action = {type: CREATE_PROJECT, project};
    return action;
}

export function gotAllProjects(projects) {
    const action = {type: GET_ALL_PROJECTS, projects};
    return action;
}

export function gotProject(project) {
    const action = {type: GET_PROJECT, project};
    return action;
}

// THUNKS
export const getAllProjects = (classroomId) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/projects/all/${classroomId}`);
            dispatch(gotAllProjects(data));
        } catch (err) {
            console.error(err);
        }
    };
};

export const getProject = (linkName) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/projects${linkName}`);
        dispatch(gotProject(data));
    };
};

export const createProject = (project) => {
    return async dispatch => {
        await axios.post(`/api/projects/create`, project);
    };
};

export const updateProject = (project) => {
    return async dispatch => {
        await axios.post(`/api/projects/update`, project);
    };
};

export const deleteProject = (id) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/projects/delete/${id}`);
        dispatch(gotAllProjects(data));
    };
};

export const deleteTopic = (topicId) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/projects/delete/topic/${topicId}`);
        dispatch(gotProject(data));
        history.push('/');
    };
};

// REDUCER
export default function project(state = {}, action) {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return {...state, projects: action.projects};
        case GET_PROJECT:
            return {...state, project: action.project};
        default:
            return state;
    }
}
