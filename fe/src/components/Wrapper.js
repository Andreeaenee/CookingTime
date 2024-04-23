import React from "react";
import Sidebar from "./Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
