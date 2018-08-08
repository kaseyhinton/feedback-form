export const ADD_FEEDBACK = 'ADD_FEEDBACK';

export const addFeedback = (feedback) => {
  return {
    type: ADD_FEEDBACK,
    feedback
  };
};
