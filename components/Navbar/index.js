/** @format */

import React from "react";
import { Menu } from "antd";

const NavBar = () => {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["brand"]} theme="dark">
      <Menu.Item key="brand">PROGRESS TRACKER</Menu.Item>
      <Menu.Item key="courses">Courses</Menu.Item>

      <Menu.SubMenu key="Profile" title="My Profile" className="ms-auto">
        <Menu.Item key="ac">Account</Menu.Item>
        <Menu.Item key="lg" className="text-danger" onClick={() => {}}>
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default NavBar;
