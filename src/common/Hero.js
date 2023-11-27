import React from "react";
import classes from "./Hero.module.css";
import logo from "../assets/img/logoReact.png";
const Hero = ({title,message}) => {
  return (
    <div className={classes.hero}>
      <img src={logo} className={classes.img} />
      <p className={classes.text}>
        Examples of content loading optimization
      </p>
      <div>
        <span className={classes.title}>
         {title}
        </span>
        <br />
        <span className={classes.message}>
          {message}
        </span>
      </div>
     
    </div>
  );
};

export default Hero;
