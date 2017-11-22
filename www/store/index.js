import { createStore } from 'redux';

const initialStore = {
  messageForFunctionBase: "Hello react function based component",
  messageForClassBase: "Hello react class based component",
  users: [
    { id: "aaaaab8d-3db5-4e02-b794-7f8ae239170a", username: "pwillis", comment: "this is a comment from PHIL!!", },
    { id: "aaaaab8d-3db5-4e02-b794-7f8ae239170ab", username: "cfoster", comment: "This is Chris's first comment", },
  ]
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'ADD_USER':
      state.users = state.users.concat(action.payload);
      break;
    case 'ADD_COMMENT':
      state.users = state.users.concat(action.payload);
      break;

    default:
      return state;
  }
  return state;
}

module.exports = createStore(reducer);