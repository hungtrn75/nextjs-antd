import React from "react";
import { Form, Icon, Button, Input, Checkbox } from "antd";
import Link from "next/link";
import { withRouter } from "next/router";
import * as yup from "yup";

const FormItem = Form.Item;

class C extends React.PureComponent {
  state = {
    isLoading: false,
    confirmDirty: false
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
        this.props.registerUser(values, this.props.router);
      } else {
        this.setState({ isLoading: false });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFieldsAndScroll(["repassword"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToUsername = (rule, value, callback) => {
    const schema = yup
      .string()
      .min(4)
      .max(40);
    if (value) {
      schema.validate(value).catch(err => {
        callback("Your name shoud be between 4 to 40 characters!");
      });
    }
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

        <FormItem help={errors.name ? errors.name : undefined}>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "Please input your Name!" }
              // {
              //   validator: this.validateToUsername
              // }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem help={errors.email ? errors.email : undefined}>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              { required: true, message: "Please input your email!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem help={errors.password ? errors.password : undefined}>
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
        <FormItem help={errors.repassword ? errors.repassword : undefined}>
          {getFieldDecorator("repassword", {
            rules: [
              { required: true, message: "Please confirm your password!" },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Confirm your password"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
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

export default withRouter(RegisterForm);
