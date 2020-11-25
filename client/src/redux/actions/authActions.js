import Axios from "axios";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const AUTH_ERROR = "AUTH_ERROR";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await Axios.post("http://localhost:3200/user/signup", data);
      dispatch({
        type: SIGN_UP,
        payload: res.data.token,
      });

      localStorage("jwt_token", res.data.token);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      });
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      console.log("Sign in axios got called");
      const res = await Axios.post("http://localhost:3200/user/signin", data);
      console.log(res.data);
      dispatch({
        type: SIGN_IN,
        payload: res.data.token,
      });
    } catch (error) {
      console.log("sign in error", error.message);
    }
  };
};
