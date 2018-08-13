import {UPDATE_ERROR, UPDATE_LOADING, UPDATE_OFFLINE} from '../actions/app.js';

const INITIAL_STATE = {
  isLoading: false
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state, isLoading: action.isLoading
      }
    case UPDATE_OFFLINE:
      return {...state, offline: action.offline};
    case UPDATE_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default app;
