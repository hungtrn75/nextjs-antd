import React, { PureComponent } from "react";
import RegisterForm from "../components/auth/Register";
import { connect } from "react-redux";
import { registerUser } from "../modules/auth/actions";
import { redirectIfSignedIn } from "../utils/AuthService";

class Register extends PureComponent {
  render() {
    const { auth, errors, registerUser } = this.props;
    return (
      <div className="login-form">
        <RegisterForm auth={auth} errors={errors} registerUser={registerUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default redirectIfSignedIn(
  connect(
    mapStateToProps,
    { registerUser }
  )(Register)
);
