import React, { useEffect } from "react";
import "./location.css";

export const Location = ({ location }) => {
  console.log("Props,", location);

  return (
    <div className="">
      <h1>Location</h1>

      <div className="map-responsive mt-20 ">
        <iframe
          src={location}
          width={1200}
          height={450}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
