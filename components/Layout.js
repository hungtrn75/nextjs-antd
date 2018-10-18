import React, { Component } from "react";
import Header from "./layouts/Header";
import Sider from "./layouts/Sider";
import { Layout } from "antd";
import { connect } from "react-redux";
import { logoutUser } from "../modules/auth/actions";

class AppLayout extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { auth, logoutUser } = this.props;
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider collapsed={this.state.collapsed} />
        <Layout>
          <Header
            toggle={this.toggle}
            collapsed={this.state.collapsed}
            auth={auth}
            logoutUser={logoutUser}
          />

          <Layout.Content>{this.props.children}</Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppLayout);
