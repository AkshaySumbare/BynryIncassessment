import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <> 
      <Navbar>
        <div className=" w-screen  flex justify-around bg-slate-800 mt-[-32px] text-white ">
          <Link className="hover:text-blue-600 p-3" to={"/"}>
            Dashboard
          </Link>
        </div>
      </Navbar>
    </>
  );
};
