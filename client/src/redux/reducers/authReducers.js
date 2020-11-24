import { SIGN_UP } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  token: "",
  errors: "",
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, isAuthenticated: true, token: "", errorMessage: "" };
    default:
      return state;
  }
};

export default authReducers;
