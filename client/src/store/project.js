import axios from 'axios'
// ACTION TYPES

import {SET_PROJECT, GET_ALL_PROJECTS} from './index'

// ACTION CREATORS


export function setProject (project) {
  const action = { type: SET_PROJECT, project };
  return action;
}

export function gotAllProjects (projects) {
    const action = { type: GET_ALL_PROJECTS, projects };
    return action;
  }
//thunks

export const getAllProjects = () => {
    return async dispatch => {
      try {
        const { data } = await axios.get('/api/projects');
        //will return the array of students set on projects
        dispatch(gotAllProjects(data));
      } catch (err) {
        console.error(err);
      }
    };
  };
export const selectProject = (project) => {
  return async dispatch => {
      const { data } = await axios.post(`/api/projects/select`, project);
      dispatch(setProject(data));
  };
};
// REDUCER
export default function project (state = [], action) {
  switch (action.type) {

    case SET_PROJECT:
      return action.project;
    case GET_ALL_PROJECTS:
      return action.projects;
    default:
      return state;
  }
}
