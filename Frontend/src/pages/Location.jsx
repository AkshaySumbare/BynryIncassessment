import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./location.css";

export const Location = () => {
  const [location, setlocation] = useState("");
  const params = useParams();
  console.log("Location", location);

  const getUserData = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/user/${params.id}`
      );
      const data = await res.json();

      if (res.ok) {
        setlocation(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="">
        {location && location != null && location != undefined && (
          <div className="">
            <div className="mt-9 text-2xl ">
              <h1>{`Name: ${location.name}`}</h1>
              <h1>{location.description}</h1>
              <h1>{`Country: ${location.location.country}`}</h1>
              <h1>{`City: ${location.location.city}`}</h1>
            </div>
            <div className="map-responsive mt-5">
              <iframe
                src={location.location.maplocation}
                width={1200}
                height={450}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
