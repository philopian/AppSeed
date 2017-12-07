import { ADD_COMMENT } from "../../constants/action-types";

const initialState = [
  { id: "aaaaab8d-3db5-4e02-b794-7f8ae239170a", username: "pwillis", comment: "this is a comment from PHIL!!", },
  { id: "aaaaab8d-3db5-4e02-b794-7f8ae239170ab", username: "cfoster", comment: "This is Chris's first comment", },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      state = [...state, action.payload];
      break;
    default:
      break;
  }
  return state;
};