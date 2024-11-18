import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import "./userdata.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export const UserData = () => {
  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const navigate = useNavigate();

  const sortOptions = ["name", "description", "location"];

  // ********************************Get Sort Data********************************

  const handleSort = async (e) => {
    let value = e.target.value;

    value == "location" ? setSortValue(location.city) : setSortValue(value);

    try {
      const res = await fetch(
        `http://localhost:3000/api/users/getUsers?sort=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setUsers(data.myData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //*****************search **************************************/
  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);

    try {
      const res = await fetch(
        `http://localhost:3000/api/users/getSearch?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ***********************

  const handlePageClick = async (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedUser();
  };
  const getPaginatedUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/getPaginate?page=${currentPage.current}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setPageCount(data.pageCount);

      if (res.ok) {
        setUsers(data.paginateData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      alert("deleted Successfully");
      if (res.ok) {
        getPaginatedUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUser();
  }, []);
  useEffect(() => {
    handleSearch(event);
  }, [searchQuery]);

  return (
    <div className="">
      <>
        <div className=" ">
          <div className=" font-bold text-2xl mt-5"> Dashboar</div>
          <div className="flex justify-around">
            <div className="">
              <div className="border border-black">
                <select
                  name=""
                  id=""
                  style={{
                    width: "120px",
                    borderRadius: "2px",
                    height: "35px",
                  }}
                  onChange={handleSort}
                  value={sortValue}
                >
                  <option>Sort By</option>
                  {sortOptions.map((item, index) => {
                    return (
                      <>
                        <option value={item} key={index}>
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="border border-black">
              <form action="">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-2 black p-1"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>

          <div className="mt-4">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Google Map</th>
                  <th>Update</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users != undefined &&
                  users.map((users, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td className="">
                            {users.name.length > 25
                              ? users.name.substring(0, 25) + "..."
                              : users.name}
                          </td>
                          <td>
                            {users.description.length > 25
                              ? users.description.substring(0, 25) + "..."
                              : users.description}
                          </td>

                          <td>
                            {users.location.city}, {users.location.country}
                          </td>
                          <td className="">
                            <Link to={`/users/${users._id}/location`}>
                              <Button className="ml-5 mb-2 mt-2">
                                <img
                                  src="./download.png"
                                  alt=""
                                  width={50}
                                  height={50}
                                />
                              </Button>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/users/${users._id}/update`}>
                              <h1
                                color="blue"
                                className="p-1 ml-4 text-green-600 "
                              >
                                Edit
                              </h1>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/users/${users._id}/details`}>
                              <Button
                                color="blue"
                                className="p-1 w-20 bg-blue-950  rounded-md"
                              >
                                More..
                              </Button>
                            </Link>
                          </td>
                          <td>
                            <h1
                              color="blue"
                              className="p-1 ml-4 text-red-600 cursor-pointer "
                              onClick={() => deleteUser(users._id)}
                            >
                              Delete
                            </h1>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>

            <ReactPaginate
              className="flex space-x-4 justify-center mt-4 mb-8"
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="flex space-x-4"
              pageClassName="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
              pageLinkClassName="text-black"
              previousClassName="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
              previousLinkClassName="text-black"
              nextClassName="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
              nextLinkClassName="text-black"
              activeClassName="bg-blue text-white"
              forcePage={currentPage.current - 1}
            />
          </div>
        </div>
      </>
    </div>
  );
};
