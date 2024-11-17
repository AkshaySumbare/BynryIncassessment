import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <>
      <Navbar>
        <div className="  w-full flex justify-around bg-slate-600 text-white ">
          <Link className="hover:text-blue-600 p-3" to={"/"}>
            Dashboard
          </Link>
        </div>
      </Navbar>
    </>
  );
};
