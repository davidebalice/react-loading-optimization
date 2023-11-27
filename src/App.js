import React, { useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Menu from "./common/Menu";
import Hero from "./common/Hero";
import Wrapper from "./common/Wrapper";
import InfinityScroll from "./components/InfinityScroll";
import LoadMore from "./components/LoadMore";
import LazyLoad from "./components/LazyLoad";
import Skeleton from "./components/Skeleton";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [page, setPage] = useState("InfinityScroll");

  return (
    <>
      <Header />
      <Menu setPage={setPage} />
      <Wrapper>
        {page === "InfinityScroll" ? (
          <>
            <Hero
              title="Infinity scroll"
              message="Load other products by scrolling the page and making additional API calls"
            />
            <InfinityScroll />
          </>
        ) : page === "LoadMore" ? (
          <>
            <Hero
              title="Load more"
              message="Click button to load other products and making additional API calls"
            />
            <LoadMore />
          </>
        ) : page === "LazyLoad" ? (
          <>
            <Hero
              title="Lazy load"
              message="To speed up initial page loading, load product asynchronously. Loading of products is divided into 4 times every 2 seconds"
            />
            <LazyLoad />
          </>
        ) : (
          <>
            <Hero
              title="Skeleton preview"
              message="Load products asynchronously, display fake cards while loading products."
            />
            <Skeleton />
          </>
        )}
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
