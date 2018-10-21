import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import Link from "next/link";
import Logo from "../../static/asserts/logo.svg";

const { Sider } = Layout;
const { SubMenu } = Menu;
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

        <Menu theme="dark" mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link href="/dashboard/analysis">
                <a>Analysis</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/dashboard/monitor">
                <a>Monitor</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/dashboard/workplace">
                <a>Workplace</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="profile" />
                <span>Profile</span>
              </span>
            }
          >
            <Menu.Item key="4">
              <Link href="/profile">
                <a>Account Profile</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/profile/edit-profile">
                <a>Edit Profile</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link href="/profile/add-education">
                <a>Add Education</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link href="/profile/add-experience">
                <a>Add Experience</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8">
            <Icon type="folder" />
            <span>File</span>
          </Menu.Item>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="user" />
                <span>Account</span>
              </span>
            }
          >
            <Menu.Item key="9">
              <Link href="/account/center">
                <a>Account Center</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link href="/account/setting">
                <a>Account Setting</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="database" theme="outlined" />
                <span>Datasets</span>
              </span>
            }
          >
            <Menu.Item key="11">
              <Link href="/database/infinited-scroll">
                <a>Infinited Scroll</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link href="/database/pagination">
                <a>Pagination</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link href="/database/zips">
                <a>Zips</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
