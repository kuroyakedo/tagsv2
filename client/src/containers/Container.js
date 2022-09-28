import React from "react";
import Navbar from "../components/Navbar";

const Container = (props) => {
  return (
    <div className="flex flex-no-wrap min-h-screen">
      <Navbar />
      <div className="bg-gray-light p-12 w-full font-roboto block h-full">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
