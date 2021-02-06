import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
    try {
        const res = await axios.get('/auth/me')
        dispatch(getUser(res.data))
    } catch (err) {
        console.error(err)
    }
}

/**
 * REDUCER
 */
export default function user(state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user
        default:
            return state
    }
}