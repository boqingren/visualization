
import React from "react";
import { useHistory } from "react-router-dom";
import { IH5HeaderProps } from "../../types";
import "./index.css";

const handleRollback = (history: any, path?: string) => {
  if (path) history.push(path);
  else history.go(-1);
};

const H5Header: React.FC<IH5HeaderProps> = React.memo(props => {
  const history = useHistory();
  console.log("render h5 page header components...");
  return (
    <div className="h5-page-header-components-container">
      <div className="h5-page-header-components-rollback-btn-container">
        <i onClick={() => handleRollback(history, props.path)}/>
      </div>
      <div className="h5-page-header-components-title-container">
        {props.title}
      </div>
    </div>
  );
});

export default H5Header;