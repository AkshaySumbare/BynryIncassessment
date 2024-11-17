import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextInput, Button } from "flowbite-react";

export const Edit = () => {
  const [data, setData] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  console.log("userData", data);

  const fetchUser = async (id) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/user/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      alert("Updated Successfully");

      if (res.ok) {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancle = () => {
    navigate(`/`);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="">
        <div className="p-3 max-w-3xl  min-h-screen">
          <h1 className=" text-3xl my-7 font-semibold ">Edit User</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 justify-between">
              <input
                type="text"
                placeholder="Title "
                required
                id="title"
                className="h-10 rounded-md ml-[300px] p-1  "
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
              />
              <br />
              <input
                type="text"
                placeholder="Title "
                required
                id="title"
                className="h-10 rounded-md ml-[300px] p-1"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                value={data.description}
              />
              <br />
              <input
                type="text"
                placeholder="Title "
                required
                id="title"
                className="h-10 rounded-md ml-[300px] p-1 "
                onChange={(e) => setData({ ...data, interest: e.target.value })}
                value={data.interest}
              />
              <br />
            </div>

            <div className="flex flex-col">
              <div className="ml-80 flex space-x-5">
                <Button
                  onClick={handleCancle}
                  className="w-40 h-10   p-2   rounded-3xl text-black border-2 black "
                >
                  Cancle
                </Button>
                <Button
                  type="submit"
                  className="w-40 h-10  bg-fuchsia-700 p-2  rounded-3xl text-white "
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
