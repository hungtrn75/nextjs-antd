import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Link from "next/link";
import Router from "next/router";

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
      Router.push("/");
      return { isLoading: false };
    }
    return null;
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
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
            <strong>Sign up</strong>
          </div>
          <p style={{ fontSize: "18px" }}>
            <strong>Developer Connector</strong>
          </p>
        </div>

        <FormItem
          validateStatus={errors && errors.name ? "error" : ""}
          help={errors.name ? errors.name : undefined}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={errors && errors.email ? "error" : ""}
          help={errors.email ? errors.email : undefined}
        >
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
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
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={errors && errors.repassword ? "error" : ""}
          help={errors.repassword ? errors.repassword : undefined}
        >
          {getFieldDecorator("repassword", {
            rules: [
              { required: true, message: "Please confirm your password!" }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Confirm your password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.isLoading}
            onClick={() => this.setState({ isLoading: true })}
          >
            Sign up
          </Button>
          Or{" "}
          <Link href="/login">
            <a>login now!</a>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const RegisterForm = Form.create()(C);

export default RegisterForm;
