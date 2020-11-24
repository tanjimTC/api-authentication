import Axios from "axios";

export const SIGN_UP = "SIGN_UP";

export const signUp = (data) => {
  console.log("got here");
  return async (dispatch) => {
    try {
      await Axios.post("http://localhost:3200/user/signup", data).then(
        (res) => {
          console.log("res", res);
        }
      );
      dispatch({
        type: SIGN_UP,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
