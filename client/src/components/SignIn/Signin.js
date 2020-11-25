import React from "react";
import "./Signin.css";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
// import * as action from "../../redux/actions/authActions";

const Signin = (props) => {
  const { handleSubmit, pristine, reset, submitting, signIn, state } = props;

  const formData = async (data) => {
    try {
      console.log("called", data);
      await signIn(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
  // if (state.isAuthenticated) {
  //   reset();
  //   document.querySelector("#accountAlert").style.display = "block";
  //   setTimeout(function () {
  //     document.querySelector("#accountAlert").style.display = "none";
  //   }, 2000);
  // }
  return (
    <div>
      <div className="container">
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
                <button
                  className="btn text-light mx-2 mb-2"
                  style={{ backgroundColor: "#DD4B39", width: "200px" }}
                >
                  Google
                </button>
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
    state: state.auth,
  };
};

const mapDispatchToProps = {
  signIn: signIn,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "signin" })
)(Signin);
