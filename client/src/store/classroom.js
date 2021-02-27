import axios from 'axios'

// ACTION TYPES
import {CREATE_CLASSROOM, GET_ALL_CLASSROOMS, GET_CLASSROOM} from './index'
import history from '../history';

// ACTION CREATORS
export function createdClassroom(classroom) {
    const action = {type: CREATE_CLASSROOM, classroom};
    return action;
}

export function gotAllClassrooms(classrooms) {
    const action = {type: GET_ALL_CLASSROOMS, classrooms};
    return action;
}

export function gotClassroom(classroom) {
    const action = {type: GET_CLASSROOM, classroom};
    return action;
}

// THUNKS
export const getAllClassrooms = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('/api/classrooms/all/mine');
            dispatch(gotAllClassrooms(data));
        } catch (err) {
            console.error(err);
        }
    };
};

export const getClassroom = (id) => {
    return async dispatch => {
        const {data} = await axios.get(`/api/classrooms/${id}`);
        dispatch(gotClassroom(data));
    };
};

export const createClassroom = (classroom) => {
    return async dispatch => {
        const {data} = await axios.post(`/api/classrooms/create`, classroom);
        dispatch(createdClassroom(data));
        history.push('/');
    };
};

export const updateClassroom = (classroom) => {
    return async dispatch => {
        const {data} = await axios.post(`/api/classrooms/update`, classroom);
        dispatch(gotClassroom(data));
    };
};

export const deleteStudent = ({id, googleId}) => {
    return async dispatch => {
        const {data} = await axios.post(`/api/classrooms/delete/student/${id}`, googleId);
        dispatch(gotClassroom(data));
    };
};

// REDUCER
export default function classroom(state = {}, action) {
    switch (action.type) {
        case CREATE_CLASSROOM:
            return {...state, classroom: action.classroom};
        case GET_ALL_CLASSROOMS:
            return {...state, classrooms: action.classrooms};
        case GET_CLASSROOM:
            return {...state, classroom: action.classroom};
        default:
            return state;
    }
}
