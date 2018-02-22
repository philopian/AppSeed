import { SET_ALL_USERS } from "../../actions/action-types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
};