import Axios from "axios";

export const SIGN_UP = "SIGN_UP";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await Axios.post("http://localhost:3200/user/signup", data);
      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
