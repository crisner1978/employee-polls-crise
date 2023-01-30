import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 items-center text-center space-y-4">
      <img
        className="flex w-[300px] h-[200px] object-contain"
        src="https://res.cloudinary.com/dtram9qiy/image/upload/v1659706068/my-upload/yo1rtcjrk4zj5zx3pirv.png"
        alt="Error Page Pic"
      />
      <br />
      <p className="text-3xl font-semibold">
        Oops, that Poll does not exist...
      </p>
      <p className="text-sColor text-sm sm:text-lg">
        Available polls are on the{" "}
        <Link className="text-blue-600 font-semibold" to="/">
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}
