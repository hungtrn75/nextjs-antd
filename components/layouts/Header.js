import React, { PureComponent } from "react";
import { Menu, Icon, Dropdown, Avatar, Layout } from "antd";
import "./index.less";
import Router from "next/router";

export default class Header extends PureComponent {
  state = {};

  onLogoutUser = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      auth: { user }
    } = this.props;
    const menu = (
      <Menu className="menu" selectedKeys={[]}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <span>User info</span>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <span>User setting</span>
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <span>User errors</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.onLogoutUser}>
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={() => this.props.toggle()}
        />
        {user && (
          <div className="right">
            <Dropdown overlay={menu}>
              <span className="action account">
                <Avatar
                  size="small"
                  className="avatar"
                  alt="avatar"
                  src={user.avatar}
                />
                <span className="name">{user.name}</span>
              </span>
            </Dropdown>
          </div>
        )}
      </Layout.Header>
    );
  }
}
