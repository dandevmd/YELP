import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-2"
    style={{height:'100vh'}}>
      <h1 className="h5">
        The page you are looking for does not exist.
      </h1>
      <Link to="/" className="h5">
        Go to home page...
      </Link>
    </div>
  );
};

export default NotFoundPage;
