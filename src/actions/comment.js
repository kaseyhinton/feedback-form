export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  };
};
