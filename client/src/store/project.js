import axios from 'axios'

// ACTION TYPES
import {CREATE_PROJECT, GET_ALL_PROJECTS, GET_PROJECT} from './index'

// ACTION CREATORS
export function createdProject (project) {
  const action = { type: CREATE_PROJECT, project };
  return action;
}

export function gotAllProjects (projects) {
    const action = { type: GET_ALL_PROJECTS, projects };
    return action;
}

export function gotProject (project) {
    const action = { type: GET_PROJECT, project };
    return action;
}

// THUNKS
export const getAllProjects = () => {
    return async dispatch => {
      try {
        const { data } = await axios.get('/api/projects/all/mine');
        dispatch(gotAllProjects(data));
      } catch (err) {
        console.error(err);
      }
    };
  };

export const getProject = (linkName) => {
    return async dispatch => {
        const { data } = await axios.get(`/api/projects${linkName}`);
        dispatch(gotProject(data));
    };
};

export const createProject = (project) => {
  return async dispatch => {
      const { data } = await axios.post(`/api/projects/create`, project);
      dispatch(createdProject(data));
  };
};

export const updateProject = (project) => {
    return async dispatch => {
        const { data } = await axios.post(`/api/projects/update`, project);
        dispatch(gotProject(data));
    };
};

export const deleteTopic = (topicId) => {
    return async dispatch => {
        const { data } = await axios.get(`/api/projects/delete/topic/${topicId}`);
        dispatch(gotProject(data));
    };
};

// REDUCER
export default function project (state = {}, action) {
  switch (action.type) {
      case CREATE_PROJECT:
          return {...state, project: action.project};
      case GET_ALL_PROJECTS:
          return {...state, projects: action.projects};
      case GET_PROJECT:
          return {...state, project: action.project};
      default:
          return state;
  }
}
