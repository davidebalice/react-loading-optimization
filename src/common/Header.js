import React from "react";
import classes from "./Header.module.css";
import logo from "./../assets/img/logo.png";
import github from "./../assets/img/github2.png";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <div className="container-fluid">
          <div className={classes.logoContainer}>
            <img src={logo} alt="db logo" className={classes.logo} />
            <a href="https://github.com/davidebalice/react-loading-optimization" target="_blank" rel="noreferrer">
              <img src={github} alt="db github" className={classes.github} />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
