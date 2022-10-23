/** @format */

import React from "react";

const FormInput = ({ type, name, value, settervalue }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {name}
      </label>
      <input
        id={name}
        type={type}
        value={value || ""}
        className="form-control"
        onChange={(e) => settervalue(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
