import React from "react";
import { Form, Icon, Button, Input, Checkbox } from "antd";
import Link from "next/link";
import { withRouter } from "next/router";

const FormItem = Form.Item;

class C extends React.PureComponent {
  state = {
    isLoading: false
  };
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors && Object.keys(nextProps.errors).length) {
      return { isLoading: false };
    }
    if (nextProps.auth && nextProps.auth.isAuthenticated) {
      nextProps.router.push("/");
      return { isLoading: false };
    }
    return null;
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values);
      } else {
        this.setState({ isLoading: false });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      errors
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="logo-github">
          <Icon type="github" theme="outlined" />
          <div style={{ fontSize: "18px" }}>
            <strong>Sign in</strong>
          </div>
          <p style={{ fontSize: "18px" }}>
            <strong>Developer Connector</strong>
          </p>
        </div>

        <FormItem
          validateStatus={errors && errors.email ? "error" : ""}
          help={errors.email ? errors.email : undefined}
        >
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={errors && errors.password ? "error" : ""}
          help={errors.password ? errors.password : undefined}
        >
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <Link href="/forgot">
            <a className="login-form-forgot">Forgot password</a>
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.isLoading}
            onClick={() => this.setState({ isLoading: true })}
          >
            Log in
          </Button>
          Or{" "}
          <Link href="/register">
            <a>register now!</a>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(C);

export default withRouter(LoginForm);
