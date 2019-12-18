import axios from 'axios'
import socket from '../socket';
// ACTION TYPES

import {SET_PROJECT, GET_PROJECT, GET_ALL_PROJECTS} from './index'

// ACTION CREATORS


export function setProject (project) {
  const action = { type: SET_PROJECT, project };
  return action;
}
export function gotProject (project) {
  const action = { type: GET_PROJECT, project };
  return action;
}
export function gotAllProjects (projects) {
    const action = { type: GET_ALL_PROJECTS, projects };
    return action;
  }
//thunks
export const getProject = (projectId) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api`);
      //will return the array of students set on projects
      dispatch(gotProject(data));
    } catch (err) {
      console.error(err);
    }
  };
};
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
    case GET_PROJECT:
      return action.project;
    case GET_ALL_PROJECTS:
      return action.projects;
    default:
      return state;
  }

}
