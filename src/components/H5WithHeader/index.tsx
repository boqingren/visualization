
import React from "react";
import H5Header from "../H5Header";
import { IH5WithHeaderProps } from "../../types";
import "./index.css";

const H5WithHeader: React.FC<IH5WithHeaderProps> = React.memo(props => {
  console.log("render h5 page with header components...");
  return (
    <div className="h5-page-with-header-components-container">
      <H5Header path={props.path} title={props.title} />
      <div className="h5-page-with-header-components-main-container">
        {props.children}
      </div>
    </div>
  );
});

export default H5WithHeader;