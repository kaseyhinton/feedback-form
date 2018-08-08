import { ADD_FEEDBACK } from '../actions/feedback.js';

const feedback = (state = {feedback: []}, action) => {
  switch (action.type) {
    case ADD_FEEDBACK:
      return {
        ...state,
          feedback: state.feedback.concat(action.feedback)
      }
    default:
      return state;
  }
};

export default feedback;
