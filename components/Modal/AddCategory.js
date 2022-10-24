/** @format */

import { Modal } from "antd";
import React from "react";
import FormInput from "../FormInput";

const AddCategory = ({
  isOpen,
  setIsOpen,
  name,
  setName,
  handleAddCategory,
}) => {
  return (
    <Modal
      title="Add category"
      centered
      visible={isOpen}
      onOk={handleAddCategory}
      onCancel={() => setIsOpen(false)}
    >
      <FormInput
        name={"Enter Category name"}
        settervalue={setName}
        type="text"
        value={name}
      />
    </Modal>
  );
};

export default AddCategory;
