import axios from 'axios'

// ACTION TYPES
import {CREATE_PROJECT, GET_ALL_PROJECTS} from './index'

// ACTION CREATORS
export function createdProject (project) {
  const action = { type: CREATE_PROJECT, project };
  return action;
}

export function gotAllProjects (projects) {
    const action = { type: GET_ALL_PROJECTS, projects };
    return action;
  }

// THUNKS
export const getAllProjects = () => {
    return async dispatch => {
      try {
        const { data } = await axios.get('/api/projects');
        dispatch(gotAllProjects(data));
      } catch (err) {
        console.error(err);
      }
    };
  };

export const createProject = (project) => {
  return async dispatch => {
      const { data } = await axios.post(`/api/projects/create`, project);
      dispatch(createdProject(data));
  };
};
// REDUCER
export default function project (state = [], action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return action.project;
    case GET_ALL_PROJECTS:
      return action.projects;
    default:
      return state;
  }
}
