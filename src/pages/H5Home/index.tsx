import React from "react";
import { Link } from "react-router-dom";
import { useRoutesWithMedia } from "../../hooks";
import { IRoute } from "../../types";
import "./index.css";

const H5Home = React.memo(() => {
  const routes: Array<IRoute> = useRoutesWithMedia()
  console.log("render h5 home page...");

  return (
    <div className="h5-home-page-container">
      {routes.filter(item => item.isShow).map(item => (
        <Link key={item.path} className="app-route-h5-links-item" to={item.path}>
          {item.text}
        </Link>
      ))}
    </div>
  );
});

export default H5Home;