/** @format */

import React from "react";
import { Menu } from "antd";
import Link from "next/link";

const NavBar = () => {
  const menuItems = [
    {
      key: "brand",
      label: <Link href={"/"}>PROGRESS TRACKER</Link>,
    },
    { key: "courses", label: <Link href={"/courses"}>Courses</Link> },
    { key: "profile", label: <Link href={"/account"}>My account</Link> },
  ];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["brand"]}
      theme="dark"
      items={menuItems}
    />
  );
};

export default NavBar;
