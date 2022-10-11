import React from "react";
import Navbar from "../components/Navbar";

const Container = (props) => {
  return (
    <div className="flex flex-no-wrap min-h-screen">
      <Navbar />
      <div className=" " style={{ padding: "2.5rem" }}>
        {props.children}
      </div>
    </div>
  );
};

export default Container;
