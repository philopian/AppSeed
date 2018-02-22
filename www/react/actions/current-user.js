import { CURRENT_USER } from "./action-types";

// Action creator return a plain object
const getCurrentUser = newData => ({
  type: CURRENT_USER,
  payload: newData
});
export default getCurrentUser;
