import React from "react";
import Navbar from "../components/Navbar";

const Container = (props) => {
  return (
    <div className="flex flex-no-wrap min-h-screen">
      <Navbar />
<<<<<<< HEAD
      <div className=" " style={{ padding: "2.5rem" }}>
=======
      <div className="bg-gray-light p-12 w-full font-roboto block h-full">
>>>>>>> 432e7a455084ff1949e2da3d07e615530705aa81
        {props.children}
      </div>
    </div>
  );
};

export default Container;
