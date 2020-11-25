import { AUTH_ERROR, SIGN_IN, SIGN_UP } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  token: "",
  errorMessage: "",
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        errorMessage: "",
      };
    case SIGN_IN:
      console.log("signin reducer got called");
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        errorMessage: "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducers;
