import React from "react";
import { Field, reduxForm } from "redux-form";

const Signup = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <h1>Sign up</h1>
      <form /*onSubmit={handleSubmit}*/>
        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component="input"
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <Field
              name="password"
              id="password"
              component="input"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "signup", // a unique identifier for this form
})(Signup);
