import { ADD_COMMENT } from '../actions/comment.js';

const comment = (state = {comment: {}}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
          comment: action.comment 
      }
    default:
      return state;
  }
};

export default comment;
