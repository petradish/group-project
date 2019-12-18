
import {UPDATE_NAME} from './index'

export function updateName (name) {
    const action = { type: UPDATE_NAME, name };
    sessionStorage.setItem('name', name)
    return action;
  }


export default function name (state = 'student', action) {

    switch (action.type) {
  
      case UPDATE_NAME:
        return action.name;
      default:
        return state;
    }
  }