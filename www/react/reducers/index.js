import { combineReducers } from "redux";
import currentUser from "./current-user";
import users from "./users";

export default combineReducers({
  currentUser,
  users
});