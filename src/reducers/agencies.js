import { GET_AGENCIES, RECEIVE_AGENCIES } from '../actions/agencies';

const agencies = (state = {agencies: []}, action) => {
  switch (action.type) {
    case RECEIVE_AGENCIES:
    return {
      ...state,
      agencies: action.agencies
    };
    case GET_AGENCIES:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default agencies;
