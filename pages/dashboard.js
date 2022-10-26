/** @format */

import { PlusOutlined } from "@ant-design/icons";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, Typography } from "antd";
import React, { useState } from "react";
import AddCategory from "../components/Modal/AddCategory";
import NavBar from "../components/Navbar";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabase";
import CategoryTable from "../components/DataGrid/CategoryTable";

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const user = useUser();

  const handleAddCategory = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ user_id: user.id, name }]);

      if (error) {
        toast.error(error);
        throw error;
      }

      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setName(null);
      setIsOpen(false);
      fetchAllCategories();
    }
  };

  const fetchAllCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        toast.error(error);
        throw error;
      }

      if (data) setAllCategories(data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <AddCategory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={name}
        setName={setName}
        handleAddCategory={handleAddCategory}
      />
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
          onClick={() => setIsOpen(true)}
        >
          Add Category
        </Button>
      </div>
      <hr className="text-primary mt-4" />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Typography.Title style={{ color: "#fff", marginTop: 20 }}>
          Categories
        </Typography.Title>
        <CategoryTable
          fetchAllCategories={fetchAllCategories}
          data={allCategories}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
