import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./Skeleton.module.css";
import classes2 from "./ProductCard.module.css";

const SkeletonCard = () => {
  return (
    <Card className={classes2.card  + " w-100"}>   
      <div className={`${classes.img} ${classes.animation}`}/>
      <Card.Body>
        <div className={`${classes.title} ${classes.animation}`}/>
        <div className={`${classes.text} ${classes.animation}`}/>
        <div className={`${classes.text} ${classes.animation}`}/>
      </Card.Body>
    </Card>
  );
};

export default SkeletonCard;
