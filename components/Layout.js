import React, { Component } from "react";
import Header from "./layouts/Header";
import Sider from "./layouts/Sider";
import { Layout } from "antd";
import { connect } from "react-redux";
import { logoutUser } from "../modules/auth/actions";
import ProgressBar from "react-progress-bar-plus";
import { withRouter } from "next/router";

class AppLayout extends Component {
  state = {
    collapsed: false
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth && !nextProps.auth.isAuthenticated) {
      nextProps.router.push("/login");
    }
    return null;
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { auth, logoutUser, loadingBar, isServer } = this.props;
    return (
      <>
        <Layout hasSider style={{ minHeight: "100vh", zIndex: 9 }}>
          {/* <ProgressBar
            percent={loadingBar}
            spinner={loadingBar === 0 || loadingBar === 100 ? false : "right"}
          /> */}
          <Sider collapsed={this.state.collapsed} />
          <Layout>
            <Header
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              auth={auth}
              logoutUser={logoutUser}
              isServer={isServer}
            />
            <Layout.Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff"
              }}
            >
              {this.props.children}
            </Layout.Content>
          </Layout>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loadingBar: state.loadingBar
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(AppLayout)
);
