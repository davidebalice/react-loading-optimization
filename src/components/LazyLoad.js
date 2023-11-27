import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const LazyLoadedProducts = React.lazy(() => import("./LazyLoadedProducts"));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finishLoad, setFinishLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 8;
  const seconds = 2000;
  const cycle = 3;

  useEffect(() => {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(() => {
        setLoading(false);
      }, seconds);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < cycle) {
          setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(timer); 
      }
    }, seconds);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const fetchProducts = async (pageNum) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products?page=${pageNum}&limit=${productsPerPage}`
      );
      return response.data.product;
    } catch (error) {
      setError("Error fetching products.");
      return [];
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          {[...Array(3)].map((_, index) =>
            (index+1) <= currentIndex ? (
              <>
              <Suspense key={index} fallback={<Loading />}>
                <LazyLoadedProducts fetchData={() => fetchProducts(index)} />
              </Suspense></>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
