import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import Link from "next/link";
import Logo from "../../static/asserts/logo.svg";

const { Sider } = Layout;
export default class Sidebar extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <Link href="/">
          <a className="sider-logo">
            <Logo className="sider-svg-logo" />
            {this.props.collapsed === false ? (
              <h1 className="logo-title">Ant Design Pro</h1>
            ) : null}
          </a>
        </Link>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
