import { combineReducers } from "redux";
import authReducer from "store/reducers/authReducer";
const appReducer = combineReducers({
  authReducer
  //every next reducer must be put here
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
