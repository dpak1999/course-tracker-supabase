/** @format */

import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React from "react";
import NavBar from "../components/Navbar";

const DashboardPage = ({ session }) => {
  const handleAddCategory = () => {};

  return (
    <div>
      <NavBar />
      <Typography style={{ color: "#fff", textAlign: "center" }}>
        <Typography.Title style={{ color: "#fff", marginTop: 15 }}>
          How this works??
        </Typography.Title>
        <Typography.Paragraph style={{ color: "#fff", marginTop: 10 }}>
          Create a category and then a course with that category (Every course
          must have a category), <br /> After creating a course you need to
          create topics in it, to be able to track percentage.
        </Typography.Paragraph>
      </Typography>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size={"large"}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>
      <hr className="text-primary mt-4" />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Typography.Title style={{ color: "#fff", marginTop: 20 }}>
          Categories
        </Typography.Title>
      </div>
    </div>
  );
};

export default DashboardPage;
