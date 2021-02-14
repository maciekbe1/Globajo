const INITIAL_DATA = {
  isAuth: false,
  data: null
};
const authReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        isAuth: action.isAuth,
        data: action.data
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        data: null
      };
    default:
      return state;
  }
};

export default authReducer;
