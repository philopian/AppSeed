import { CURRENT_USER } from "../../actions/action-types";

export default (state = "", action) => {
  switch (action.type) {
    case CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};
