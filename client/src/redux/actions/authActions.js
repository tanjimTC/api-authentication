import Axios from "axios";

export const SIGN_UP = "SIGN_UP";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      await Axios.post("http://localhost:3200/user/signup", data).then(
        (res) => {
          console.log("res", res);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
