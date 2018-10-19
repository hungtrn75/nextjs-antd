import React, { PureComponent } from "react";
import LoginForm from "../components/auth/Login";
import { connect } from "react-redux";
import { loginUser } from "../modules/auth/actions";
import { redirectIfSignedIn } from "../utils/AuthService";

class Login extends PureComponent {
  render() {
    const { auth, errors, loginUser } = this.props;
    return (
      <div className="login-form">
        <LoginForm auth={auth} errors={errors} loginUser={loginUser} />
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
    { loginUser }
  )(Login)
);
