import React from "react";
import loading from "../assets/img/spinner.svg";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading}/>
    </div>
  );
};

export default Loading;