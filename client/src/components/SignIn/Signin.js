import React from "react";
import "./Signin.css";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { googleAuth, signIn } from "../../redux/actions/authActions";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

const Signin = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    signIn,
    currentAuthState,
    googleAuth,
  } = props;

  let history = useHistory();

  const formData = async (data) => {
    try {
      console.log("called", data);
      await signIn(data);
      reset();
      console.log(currentAuthState);
    } catch (error) {
      console.log(error);
    }
  };

  // if (currentAuthState.isAuthenticated) {
  //   history.push({
  //     pathname: "/deshboard",
  //   });
  // }

  // if (state.isAuthenticated) {
  //   reset();
  //   document.querySelector("#accountAlert").style.display = "block";
  //   setTimeout(function () {
  //     document.querySelector("#accountAlert").style.display = "none";
  //   }, 2000);
  // }

  const responseGoogle = async (response) => {
    try {
      console.log(response);
      await googleAuth(response.accessToken);
      if (!currentAuthState.errorMessage) {
        history.push({
          pathname: "/deshboard",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div
          className="alert alert-primary"
          id="accountAlert"
          role="alert"
          style={{ display: "none" }}
        >
          logged in successfully!
        </div>
        <div
          style={{ height: "80vh", paddingTop: "15%" }}
          className="row d-flex justify-content-center  "
        >
          <div className="col-md-6 px-3 form-left">
            <div className="alert alert-primary">
              <h6 className="text-center">Sign in</h6>
            </div>
            <form onSubmit={handleSubmit(formData)}>
              <div className="form-group">
                {/* <label>Email</label> */}
                <div>
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label>Password</label> */}
                <div>
                  <Field
                    name="password"
                    id="password"
                    component="input"
                    type="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
              </div>

              {currentAuthState.errorMessage ? (
                <div className="alert alert-danger">
                  {currentAuthState.errorMessage}
                </div>
              ) : null}

              {/* {currentAuthState.isAuthenticated ? (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Account created succeddfully!</strong>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : null} */}

              <div className="mt-2">
                <button
                  className="btn btn-primary mr-2"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                  className="btn btn-danger ml-2"
                >
                  Clear Values
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 form-right">
            <div>
              <div className="alert alert-primary">
                <h6 className="text-center">
                  Or sign in using third party application
                </h6>
              </div>
              <center>
                <GoogleLogin
                  clientId="272248706097-t1mr4b563opb7pkmelmfhnto0knv7mk6.apps.googleusercontent.com"
                  buttonText="Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  style={{ backgroundColor: "#DD4B39", width: "200px" }}
                />
                {/* <button
                  className="btn text-light mx-2 mb-2"
                  style={{ backgroundColor: "#DD4B39", width: "200px" }}
                >
                  Google
                </button> */}
                <button
                  className="btn text-light mx-2 mb-2"
                  style={{ backgroundColor: "#3b5998", width: "200px" }}
                >
                  Facebook
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentAuthState: state.auth,
  };
};

const mapDispatchToProps = {
  signIn: signIn,
  googleAuth: googleAuth,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "signin" })
)(Signin);
