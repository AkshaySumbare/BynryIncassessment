import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import "./userdata.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export const UserData = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [moredata, setMoreData] = useState("");
  console.log(moredata);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [location, setLocation] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60502.966421097866!2d73.67601900992653!3d18.599476122610728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc048041bef%3A0xd0c9eb5ac3c3dee5!2sHinjawadi%2C%20Pune%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1731644652639!5m2!1sen!2sin"
  );

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
        `http://localhost:3000/api/users/getUsers?sort=${value}`
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
        `http://localhost:3000/api/users/getSearch?search=${searchQuery}`
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
        `http://localhost:3000/api/users/getPaginate?page=${currentPage.current}&limit=${limit}`
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
              <div className="">
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

            <div className="">
              <form action="">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-2 black mb-4 p-1"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>

          <div className="">
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
                            <Button
                              className="ml-5 mb-2 mt-2"
                              onClick={() =>
                                setLocation(users.location.maplocation)
                              }
                            >
                              <img
                                src="./download.png"
                                alt=""
                                width={50}
                                height={50}
                              />
                            </Button>
                          </td>
                          <td>
                            <Link to={`/users/${users._id}/update`}>
                              <h1
                                color="blue"
                                className="p-1 ml-4 text-blue-500 "
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
                            <Link to={`/users/${users._id}/update`}>
                              <h1
                                color="blue"
                                className="p-1 ml-4 text-red-600 "
                              >
                                Delete
                              </h1>
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <ReactPaginate
              className="flex space-x-5 justify-center mt-4 mb-8  "
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center "
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage.current - 1}
            />
          </div>

          <h1 className="font-bold text-black"></h1>
          <div className="">
            <h1>{users.name}</h1>
          </div>
          <div className="map-responsive  ">
            <iframe
              src={location}
              width={1200}
              height={450}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </>
    </div>
  );
};
