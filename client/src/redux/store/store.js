import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";
import authReducers from "../reducers/authReducers";

const jwtToken = localStorage.getItem("Auth-Jwt");

console.log(jwtToken);

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  auth: authReducers,
});

// const store = (window.__REDUX_DEVTOOLS_EXTENSION__
// ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore)
//   : createStore)(reducer, {}, applyMiddleware(thunk));

const store = createStore(
  reducer,
  {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
      errorMessage: "",
    },
  },
  applyMiddleware(thunk)
);

export default store;
