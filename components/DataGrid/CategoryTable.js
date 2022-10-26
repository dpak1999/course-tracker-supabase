/** @format */

import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">Edit {record.name}</Button>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
];

const CategoryTable = ({ fetchAllCategories, data }) => {
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="container">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default CategoryTable;
