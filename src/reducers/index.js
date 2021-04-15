import { combineReducers } from "redux";
import { companyID } from "./companyIDReducer";

export default combineReducers({
  id: companyID,
});
