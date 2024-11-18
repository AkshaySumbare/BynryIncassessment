import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Extradetails = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const getUserData = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/user/${params.id}`
      );
      const data = await res.json();

      if (res.ok) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="container mx-auto p-4 h-[1000px]">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl ">Profile Details</h1>
        <div className="flex justify-between text-black">
          <div className="text-start">
            <div className="">
              <h2 className=" font-semibold mb-2 text-4xl text-black">
                {`Name: ${data.name}`}
              </h2>
              <br />
              <p className=" text-2xl ">Description: {data.description}</p>
            </div>
            <br />
            <div className="">
              <h1 className="text-2xl">Interest: {data.interest}</h1>

              <br />

              <h1 className="text-2xl">{`Contact ${data.contact}`}</h1>
            </div>
          </div>
          <div className="">
            <img
              src={data.photoUrl}
              alt={data.name}
              className="object-cover cursor-pointer "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
