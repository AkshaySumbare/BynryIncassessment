import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Navbar>
        <div className=" bg-[#3f3c66] w-full flex justify-between text-white h-16 mb-5  p-3">
          <Link to={"/"}>Dashboard</Link>
      
          <Link to={"/details"}>Extra Details</Link>
        </div>
      </Navbar>
    </>
  );
};
