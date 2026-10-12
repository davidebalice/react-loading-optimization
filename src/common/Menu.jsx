import React from "react";
import { Button } from "react-bootstrap";
import classes from "./Header.module.css";

const Menu = ({ setPage }) => {
  const handleInfinityScroll = () => {
    setPage("InfinityScroll");
  };

  const handleLoadMore = () => {
    setPage("LoadMore");
  };

  const handleLazyLoad = () => {
    setPage("LazyLoad");
  };

  const handleSkeleton = () => {
    setPage("Skeleton");
  };

  return (
    <div className={classes.menu}>
      <Button onClick={handleInfinityScroll} className={classes.button}>
        Infinity scroll
      </Button>
      <Button onClick={handleLoadMore} className={classes.button}>
        Load more
      </Button>
      <Button onClick={handleLazyLoad} className={classes.button}>
        Lazy load
      </Button>
      <Button onClick={handleSkeleton} className={classes.button}>
        Skeleton preview
      </Button>
    </div>
  );
};

export default Menu;
