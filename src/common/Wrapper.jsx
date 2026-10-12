import React from "react";
import classes from "./Header.module.css";

const Wrapper = ({children}) => {
  return (
    <div className={classes.wrapper}>
     {children}
    </div>
  );
};

export default Wrapper;
